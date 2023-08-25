import { useParams } from "react-router-dom";
import { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { RootState } from "../../state/rooState";
import { useSelector } from "react-redux";
import { User } from "../../state/user";

const VideoRoom = () => {
  const param = useParams();
  const [user] = useState<User | any>(
    useSelector((state: RootState) => state?.user?.user)
  );
    const myMeeting = async (element: any) => {
      const appId = import.meta.env.VITE_APPID;
      const serverSecret = import.meta.env.VITE_SERVERSECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        param?.id ?? "",
        user?._id,
        user?.username
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.origin + window.location.pathname,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
      });
      
    };

  

  return (
    <div className=" mt-5">
      <div
        ref={myMeeting}
      ></div>
    </div>
  );
};

export default VideoRoom;
