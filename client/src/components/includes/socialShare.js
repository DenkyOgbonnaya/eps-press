import React from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
 
} from 'react-share';

const SocialShare = ({post, pathname}) => {
    let postUrl = `https://eps-press.herokuapp.com${pathname}`;
    
    return (
        <div className='social-share'> 
        <b>Share Post:</b>
            <ul> 
                <li> 
                    <FacebookShareButton 
                        url={postUrl}
                        quote={post.title}
                        className='button'
                    >
                    <FacebookIcon 
                        size={32}
                        round={false}
                    />
                    </FacebookShareButton>
                </li>
                <li> 
                    <TwitterShareButton 
                        url={postUrl}
                        title={post.title}
                        className='button'
                    >
                    <TwitterIcon 
                        size={32}
                        round={false}
                    />
                    </TwitterShareButton>
                </li>
                <li> 
                    <WhatsappShareButton 
                        url={postUrl}
                        title={post.title}
                        className='button'
                    >
                    <WhatsappIcon 
                        size={32}
                        round={false}
                    />
                    </WhatsappShareButton>
                </li>
                <li> 
                    <TelegramShareButton 
                        url={postUrl}
                        title={post.title}
                        className='button'
                    >
                    <TelegramIcon 
                        size={32}
                        round={false}
                    />
                    </TelegramShareButton>
                </li>
                <li> 
                    <LinkedinShareButton 
                        url={postUrl}
                        className='button'
                    >
                    <LinkedinIcon 
                        size={32}
                        round={false}
                    />
                    </LinkedinShareButton>
                </li>
            </ul>
        </div>
    )
}

export default SocialShare;