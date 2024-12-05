import { User } from "@prisma/client";
import Link from "next/link";

export default function UserProfile({ user, isOwner }: { user: User; isOwner: boolean }) {
  return (
    <div className="flex justify-center w-full m-auto">
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-4">
          <div className="flex rounded-full size-16 bg-primary-500"></div>
          <div>
            <div>
              <span>{user.username}</span>
              <span>{` #${user.id}`}</span>
            </div>
            <div className="text-sm text-neutral-500">{user.email}</div>
            <div>{`${user.bio ? user.bio : ""}`}</div>
          </div>
        </div>
        {isOwner && (
          <Link className="btn-sm" href={`${user.username}/edit`}>
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}
