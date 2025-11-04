import React from "react";
import { FeaturedIcon, Separator, Text } from "@Reptile/Components/Atoms";

const _ModalTitle = ({
  icon,
  title,
  iconColor = "primary",
  inline,
}: Reptile.Props.ModalTitleProps) => {
  const titleText = title ? (
    <Text size="medium" color="dark-gray" weight="bold">
      {title}
    </Text>
  ) : (
    ""
  );
  return (
    <>
      {icon ? (
        <div
          style={{
            display: "flex",
            flexDirection: inline ? "row" : "column",
            alignItems: inline ? "center" : "flex-start",
            gap: inline ? "8px" : "0",
          }}
        >
          <FeaturedIcon
            size="lg"
            type="light-circle-outline"
            color={iconColor}
            icon={icon}
          />
          {inline ? titleText : <Separator bottom={20} />}
        </div>
      ) : null}
      {!inline && titleText}
      <Separator bottom={12} />
    </>
  );
};

export default _ModalTitle;
