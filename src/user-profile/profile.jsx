import { UserAvatar } from "./avatar";
import { UserWallpaper } from "./user-wallpaper";

function handleUserWallpaper() {
//if user has uploaded wallpaper use it or get default wallpaper
};

function handleUserAvatar() {
//if user has uploaded avatar picture use it or get default avatar
};
return (
    <>
    <UserWallpaper props={handleUserWallpaper} />
    <UserAvatar props={handleUserAvatar} />
    </>
);