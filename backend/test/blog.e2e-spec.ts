import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { redactDynamicFields } from './test.helper';
import { BlogPostOutputDTO } from 'src/blog/dto/blog-post-output.dto';
import { randomUUID } from 'crypto';

describe('BlogController (e2e)', () => {
  let app: INestApplication<App>;
  let mockPost: BlogPostOutputDTO;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    mockPost = (
      await request(app.getHttpServer())
        .post('/blog/posts')
        .set('Authorization', 'userId:some-userid;permissions:create:blog-post')
        .send({
          title: 'Test Post',
          content: 'This is a test post',
        })
        .expect(201)
    ).body as BlogPostOutputDTO;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/blog/posts (GET) Blog posts', async () => {
    await request(app.getHttpServer())
      .get('/blog/posts')
      .set('Authorization', 'userId:some-userid')
      .expect(200)
      .expect((res) => {
        expect(res.body.posts).toBeInstanceOf(Array);
        expect(res.body.posts.length).toBeGreaterThanOrEqual(0);
      });
  });

  it('/blog/posts (GET) Blog posts paginated', async () => {
    await request(app.getHttpServer())
      .get('/blog/posts?page=2&pageSize=10')
      .set('Authorization', 'userId:some-userid')
      .expect(200)
      .expect((res) => {
        expect(res.body.posts).toBeInstanceOf(Array);
        expect(res.body.posts.length).toEqual(10);
      });
  });

  it('/blog/posts (GET) 401 on get posts', async () => {
    await request(app.getHttpServer())
      .get('/blog/posts')
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('statusCode', 401);
        expect(res.body).toHaveProperty(
          'message',
          'Authorization header is missing',
        );
      });
  });

  it('/blog/posts (POST) Create a blog post', async () => {
    const res = await request(app.getHttpServer())
      .post('/blog/posts')
      .set('Authorization', 'userId:some-userid;permissions:create:blog-post')
      .send({
        title: 'Test Post',
        content: 'This is a test post',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Post');
        expect(res.body.content).toBe('This is a test post');
      });

    expect(redactDynamicFields(res.body)).toMatchSnapshot();
  });

  it('/blog/posts (POST) 403 on post', async () => {
    await request(app.getHttpServer())
      .post('/blog/posts')
      .set('Authorization', 'userId:some-userid;permissions:read:blog-post')
      .send({
        title: 'Test Post',
        content: 'This is a test post',
      })
      .expect(403)
      .expect((res) => {
        expect(res.body).toHaveProperty('statusCode', 403);
        expect(res.body).toHaveProperty(
          'message',
          'User does not have the required permissions',
        );
      });
  });

  it('/blog/posts/:id (GET) Get a blog post by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/blog/posts/${mockPost.id}`)
      .set('Authorization', 'userId:some-userid;')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', mockPost.id);
        expect(res.body).toHaveProperty('title', mockPost.title);
        expect(res.body).toHaveProperty('content', mockPost.content);
      });
    expect(redactDynamicFields(res.body)).toMatchSnapshot();
  });

  it('/blog/posts/:id (GET) should throw 404 for non-existing post', async () => {
    await request(app.getHttpServer())
      .get(`/blog/posts/${randomUUID().toString()}`)
      .set('Authorization', 'userId:some-userid;')
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('statusCode', 404);
        expect(res.body).toHaveProperty('message', 'Post not found');
      });
  });

  it('/blog/posts/:id/like (PATCH) Like a blog post', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/blog/posts/${mockPost.id}/like`)
      .set('Authorization', 'userId:some-userid;')

      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('likes');
        expect(res.body.likes).toBe(1);
      });
    expect(redactDynamicFields(res.body)).toMatchSnapshot();
  });
  it('/blog/posts/:id/like (PATCH) validate param blog post id', async () => {
    await request(app.getHttpServer())
      .patch('/blog/posts/invalid-id/like')
      .set('Authorization', 'userId:some-userid;')
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
      });
  });
  it('/blog/posts/:id/like (PATCH) 404 blogpost not found', async () => {
    await request(app.getHttpServer())
      .patch(`/blog/posts/${randomUUID().toString()}/like`)
      .set('Authorization', 'userId:some-userid;')
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('statusCode', 404);
        expect(res.body).toHaveProperty('message', 'Post not found');
      });
  });
});
