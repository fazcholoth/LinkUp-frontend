import { ArrowUturnRightIcon } from '@heroicons/react/24/solid';

interface SharePostProps {
  postId: string;
  picture: string;
}

const SharePost = ({ postId, picture }: SharePostProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: picture,
          text: "hiiiii",
          url: `/posts/${postId}`,
        });
      } catch (error) {
        console.error('Error sharing post:', error);
      }
    } else {
      console.error('Web Share API not supported');
    }
  };

  return (
    <div>
      <ArrowUturnRightIcon className='w-6 h-6 cursor-pointer' onClick={handleShare} />
    </div>
  );
};

export default SharePost;
