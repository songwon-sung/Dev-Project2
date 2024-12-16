import { api } from "../api/axios";
import { createNotification } from "../utils/api/createNotification";

interface newCommentFnType {
  comment: string;
  postId: string | undefined;
  postAuthorId: string;
}

export const newCommentFn = async (option: newCommentFnType) => {
  try {
    const { data } = await api.post("/comments/create", option);
    // 응답 처리
    const rtype = "COMMENT";
    const commentUserId = data.id;
    const postUserId = option.postAuthorId;
    const postId = data.post;

    await createNotification(rtype, commentUserId, postUserId, postId);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const delCommentFn = async (commentId: string) => {
  try {
    await api.delete("/comments/delete", {
      data: { id: commentId },
    });
    // console.log(`삭제 성공: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error("삭제 실패:", err);
  }
};
