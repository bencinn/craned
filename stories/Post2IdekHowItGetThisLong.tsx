import {
  getLikesCount,
  getUserLikePostOrNot,
} from "@/lib/actions/updateUser.action";
import Post from "@/lib/models/post.model";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import LikeButton from "./likebtn";
import { Share } from "./share";

export async function PoooooooseOrPostWhateverDonTMatter({
  post,
}: {
  post: Post;
}) {
  const user = await currentUser();
  const likecount = await getLikesCount(post._id);
  if (!user) return <></>;
  return (
    <div>
      <div className="text-white text-lg">{post.text}</div>
      <div className="flex justify-center items-center">
        {post.image ? (
          <Image
            src={post.image}
            width={400}
            height={400}
            alt="Image"
            className="bg-pri object-cover rounded-2xl w-[400px] h-[400px]"
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex justify-center mt-1">
        <div className="flex items-center justify-between bg-pri p-1 rounded-lg gap-3">
          <LikeButton
            userid={user.id}
            postid={post._id}
            likes={likecount}
            isliking={await getUserLikePostOrNot(user.id, post._id)}
          />
          <Share
            url={`${process.env.VERCEL_URL || "localhost:3000"}/posts/${
              post._id
            }`}
          />
        </div>
      </div>
    </div>
  );
}
