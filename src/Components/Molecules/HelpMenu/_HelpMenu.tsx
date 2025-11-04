import { Text } from "@Reptile/Components/Atoms";
import { reactive } from "@Reptile/Framework";
import React, { useRef } from "react";

import "./_HelpMenu.scss";
import clsx from "clsx";

const _HelpMenu = reactive<Reptile.Props.HelpMenuProps>(
  ({ children, title, description, isActive, type }) => {
    const root = useRef<HTMLDivElement>(null);

    /*const handleClick = () => {
            onClick(root.current?.id);
        };*/

    return (
      <div
        ref={root}
        id={title}
        className={clsx(
          // "rt-help-menu",
          isActive && "highlighted",
          type && `rt-help-menu--${type}`
        )}
      >
        <Text
          color={"dark-gray"}
          className={"help-title"}
          weight={"bold"}
          size={"h3"}
        >
          {title}
        </Text>
        {description && (
          <Text
            className={"help-description"}
            color={"dark-gray"}
            weight={"medium"}
            size={"small"}
          >
            {description}
          </Text>
        )}
        {children}
      </div>
    );
  }
);

export default _HelpMenu;
