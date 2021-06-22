import { UserAvatar } from "./avatar";
import { UserWallpaper } from "./user-wallpaper";

export function Profile (){

function handleUserWallpaper() {
    //if user has uploaded wallpaper use it or get default wallpaper
    return "https://picsum.photos/950/300"
};

function handleUserAvatar() {
//if user has uploaded avatar picture use it or get default avatar
    return "https://picsum.photos/100/100"
};

return (
    <>
    <UserWallpaper url={handleUserWallpaper()}/>
    <UserAvatar url={handleUserAvatar()} />
    </>
);
}
