import React from "react";
import { Flipped } from "react-flip-toolkit";
import { reactive } from "@Reptile/Framework";
import AppWidgets from "@Reptile/Assets/AppWidgets.json";
import { WidgetModel } from "@Reptile/Store/Models";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  ChartArea,
} from "@progress/kendo-react-charts";

import "./_TelerikChartWidget.scss";

const defaultWidget = new WidgetModel(
  AppWidgets.find(
    ({ type }) => type === "telerik-pie-chart"
  ) as Reptile.Service.Widget
);

const TelerikChartWidget = reactive<Reptile.Props.WidgetProps>(
  ({ widget: widgetWithData }) => {
    const widget = widgetWithData ?? defaultWidget;
    // console.log(widget);

    const pieData = [
      {
        title: "India",
        value: 24,
      },
      {
        title: "Russian Federation",
        value: 26,
      },
      {
        title: "Germany",
        value: 10,
      },
      {
        title: "World",
        value: 40,
      },
      {
        title: "Test",
        value: 20,
      },
    ];

    return (
      <Flipped flipId={widgetWithData?.id ?? "preview"}>
        <div className="k-card">
          {widget.contents && (
            <Chart
              style={{
                color: widget.contents[0].styles.color,
                fontSize: widget.contents[0].styles.fontSize,
                fontFamily: widget.contents[0].styles.fontFamily,
                margin: widget.contents[0].styles.margin,
                padding: widget.contents[0].styles.padding,
                width: widget.contents[0].styles.width,
                height: widget.contents[0].styles.height,
                fontStyle: widget.contents[0].styles.fontStyle,
                borderColor: widget.contents[0].styles.borderColor,
                backgroundColor: widget.contents[0].styles.backgroundColor,
                borderRadius: widget.contents[0].styles.borderRadius,
                borderWidth: widget.contents[0].styles.borderWidth,
              }}
            >
              <ChartArea
                background={
                  widget.contents[0].styles.backgroundColor || "#ffffff"
                }
              />
              <ChartTitle
                text={
                  widget.contents
                    ? widget.contents[0]?.properties?.text
                    : "Pie Chart"
                }
                align="center"
                color={widget.contents[0]?.styles?.color || "#000000"}
                font={`${widget.contents[0].styles.fontSize || "14px"} ${
                  widget.contents[0]?.styles?.fontFamily || ""
                }`}
              />
              <ChartLegend
                position={
                  widget.contents[0]?.properties?.chartLegendPosition || "top"
                }
                orientation={
                  widget.contents[0]?.properties?.chartLegendOrientation ||
                  "horizontal"
                }
                labels={{
                  font: `${widget.contents[0].styles.fontSize} ${widget.contents[0].styles.fontFamily}`,
                  color: widget.contents[0].styles.color,
                }}
              />
              <ChartSeries>
                <ChartSeriesItem
                  type={widget.contents[0]?.properties?.chartType || "pie"}
                  overlay={{ gradient: "none" }}
                  tooltip={{
                    visible: widget.contents[0]?.properties?.isActive || false,
                  }}
                  data={pieData}
                  categoryField="title"
                  field="value"
                />
              </ChartSeries>
            </Chart>
          )}
        </div>
      </Flipped>
    );
  }
);

export default TelerikChartWidget;
