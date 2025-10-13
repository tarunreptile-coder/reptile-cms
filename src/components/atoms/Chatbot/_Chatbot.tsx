import React, { useEffect, useState } from 'react';
import data from '~/../appSettings.json';
import './_Chatbot.scss';
import { Notification } from '..';

interface Chatbot {
  onChatbotClick(): void;
}

const _Chatbot = ({ onChatbotClick }: Chatbot) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://cdn.botpress.cloud/webchat/v0/inject.js';
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      try {
        window.botpressWebChat.init({
          botId: '1e9ef879-762d-4e41-835f-39feb59fb363',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '1e9ef879-762d-4e41-835f-39feb59fb363',
          botName: 'Ask Elri',
          showBotInfoPage: false,
          enableConversationDeletion: true,
          showCloseButton: false,
          hideWidget: true,
          disableAnimations: true,
          closeOnEscape: false,
          showConversationsButton: true,
          enableTranscriptDownload: true,
          stylesheet: `${data.stg.digitalPcServiceUrl}/build/main.styles.css`,
        });

        window.botpressWebChat.onEvent(
          function() {
            window.botpressWebChat.sendEvent({ type: 'show' });
          },
          ['LIFECYCLE.LOADED']
        );
        setScriptLoaded(true);
      } catch (error) {
        Notification.error({description: 'Error on chatbot load.'})
      }
    });
    onChatbotClick();
    return () => {
      document.body.removeChild(script);
    };
  }, [scriptLoaded, onChatbotClick]);

  return <></>;
};

export default _Chatbot;
