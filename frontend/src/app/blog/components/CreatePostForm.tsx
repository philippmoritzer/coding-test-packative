import React from "react";
import { BlogPost } from "../types/blogPost.type";
import { useCreatePost } from "../hooks/useCreatePost";
import { useTranslation } from "react-i18next";

interface CreatePostFormProps {
  onPostCreated: (newPost: BlogPost) => void; }

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { t } = useTranslation();
   const {
    title,
    setTitle,
    description,
    setContent: setDescription,
    isLoading,
    error,
    handleSubmit,
  } = useCreatePost(onPostCreated);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h2>
      {error && <p className="text-red-500 text-sm mb-4">{t(error)}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter the title"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter the description"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePostForm;