import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) todo items', async () => {
    const res = await request(app.getHttpServer())
      .get('/todo/list')
      .set('Authorization', 'authenticated;permissions: get-todo')
      .expect(200);
    console.log(res.body);
    expect(res.body).toMatchSnapshot();
  });
});
