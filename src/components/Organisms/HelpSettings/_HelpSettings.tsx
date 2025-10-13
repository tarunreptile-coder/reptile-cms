import React, { useCallback, useState, useEffect, useRef } from "react";
import "./_HelpSettings.scss";
import { HelpMenu } from "@Reptile/Components/Molecules";
import YouTube from "react-youtube";
import { controlled } from "@Reptile/Framework";
import { useInitController } from "@Reptile/Hooks";
import { Chatbot, Text } from "@Reptile/Components/Atoms";
import clsx from "clsx";

// Define constants for widths
const MIN_WIDTH = 350;
const INITIAL_WIDTH = 350; // Initial width for the sidebar
const MAX_WIDTH_PERCENTAGE = 0.5; // 50% of window width

const _HelpSettings = controlled<
  Reptile.Props.HelpSettingsProps,
  Reptile.Controllers.IHelpSettingsController
>(({ helpMenu, controller }) => {
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startWidth = useRef(0);
  const animationFrameRef = useRef(null);

  const isDraggingRef = useRef(isDragging);
  const sidebarWidthRef = useRef(sidebarWidth);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    sidebarWidthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  useInitController(controller);

  const { docs, video, chatbot, screenContent } = helpMenu;

  /*const handleClick = useCallback(
    (newName: string) => {
      controller.removeChatBot();
      controller.onActiveMenu(newName);
    },
    [controller]
  );*/

  useEffect(() => {
    const handleWindowResize = () => {
      const maxAllowedWidth = window.innerWidth * MAX_WIDTH_PERCENTAGE;
      setSidebarWidth((prevWidth) => {
        return Math.min(prevWidth, maxAllowedWidth);
      });
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleShowClick = () => {
    controller.name = null;
    controller.removeChatBot();
    controller.isActive = !controller.isActive;
    if (controller.isActive) {
      setSidebarWidth(INITIAL_WIDTH);
    }
  };

  const onChatbotClick = () => {
    controller.moveChatBot();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      const currentX = e.clientX;
      const totalDeltaX = currentX - startX.current;
      const newWidth = startWidth.current - totalDeltaX;
      const maxAllowedWidth = window.innerWidth * MAX_WIDTH_PERCENTAGE;
      const constrainedWidth = Math.max(
        MIN_WIDTH,
        Math.min(maxAllowedWidth, newWidth)
      );
      setSidebarWidth(constrainedWidth);
      sidebarWidthRef.current = constrainedWidth;
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      startX.current = e.clientX;
      startWidth.current = sidebarWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth]
  );

  const currentRenderWidth = controller.isActive ? sidebarWidth : 0;
  return (
    <div className="rt-help-settings">
      <div
        className={`show-hide ${controller.isActive ? "active" : ""}`}
        onClick={handleShowClick}
        aria-label="Toggle Help Panel"
        role="button"
      >
        <Text color={"black"} weight={"bold"} size={"medium"}>
          ?
        </Text>
      </div>
      {controller.isActive && (
        <div
          className={clsx(
            "help-menu-resizable-wrapper",
            controller.isActive && "active",
            isDragging && "react-resizable-resizing"
          )}
          style={{ width: currentRenderWidth }}
        >
          <span
            className={"custom-resizable-handle"}
            onMouseDown={handleMouseDown}
          />
          <div className="help-menu-container">
            <div
              onClick={handleShowClick}
              className="close-menu"
              aria-label="Close Help Panel"
              role="button"
            >
              <Text color={"black"} weight={"bold"} size={"large"}>
                X
              </Text>
            </div>
            <div className="help-panel-header">
              <Text weight={"bold"} size={"h2"} color={"black"}>
                Help & Support
              </Text>
            </div>
            <div className="help-menu-content-area">
              {screenContent && (
                <div className="rt-help-menu primary-content-section">
                  <Text
                    color={"dark-gray"}
                    className={"help-title"}
                    weight={"semibold"}
                    size={"h3"}
                  >
                    {screenContent?.title}
                  </Text>
                  {typeof screenContent?.content === "string" ? (
                    <Text
                      color="black"
                      weight="medium"
                      className="dynamic-content-paragraph"
                    >
                      {screenContent?.content}
                    </Text>
                  ) : (
                    <ul className="dynamic-content-list">
                      {screenContent?.content.map((item, index) => (
                        <li key={index}>
                          <Text color="black" weight="medium">
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {/* 2. Documentation Section */}
              <div className="rt-help-menu primary-content-section">
                <HelpMenu
                  title={docs.title}
                  description={docs.description}
                  isActive={controller.name === docs.title}
                  type="documentation"
                >
                  <ul className="help-links-list">
                    {docs.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.src}
                          target="_blank"
                          rel="noreferrer"
                          className="help-link"
                        >
                          <Text
                            className={"link-text"}
                            color="dark-gray"
                            weight="regular"
                          >
                            {link.name}
                          </Text>
                          <span className="external-link-icon">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </HelpMenu>
              </div>
              {/* 3. Video Tutorial Section */}
              <div className="rt-help-menu primary-content-section">
                <HelpMenu
                  title={video.title}
                  description={video.description}
                  isActive={controller.name === video.title}
                  type="video"
                >
                  <div className="video-wrapper">
                    <YouTube
                      className="video-player"
                      videoId={video.videoId}
                      opts={{
                        height: "180",
                        width: "100%",
                        playerVars: {
                          autoplay: 0,
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                    />
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=$${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="watch-on-youtube-link"
                  >
                    <Text
                      className={"link-text"}
                      color="black"
                      weight="medium"
                      size="small"
                    >
                      Watch on YouTube
                    </Text>
                    <span className="external-link-icon">↗</span>
                  </a>
                </HelpMenu>
              </div>
              {/* 4. Chatbot Section (if desired, not visible in current screenshot but present in data) */}
              {/*
              <HelpMenu
                title={chatbot.title}
                description={chatbot.description}
                isActive={controller.name === chatbot.title}
                type="chatbot"
              >
                  <button onClick={onChatbotClick} className="chatbot-button">
                      <Text color="white" weight="bold">Start Chat</Text>
                  </button>
              </HelpMenu>
              */}
            </div>
          </div>
          {/* End help-menu-content-area */}
        </div>
      )}
    </div>
  );
});

export default _HelpSettings;
/*Chatbot went on line 101
   <HelpMenu
            title={chatbot.title}
            description={chatbot.description}
            onClick={handleClick}
            isActive={controller.name === chatbot.title}
          >
            <Chatbot onChatbotClick={onChatbotClick} />
          </HelpMenu>*/
