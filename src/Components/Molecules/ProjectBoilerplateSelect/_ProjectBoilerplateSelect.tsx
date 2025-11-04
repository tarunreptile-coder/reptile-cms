import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Card,
  Collapse,
  FeaturedIcon,
  FolderPlusIcon,
  Image,
  Text,
} from "@Reptile/Components/Atoms";
import { TransitionGroup } from "react-transition-group";
import { reactive, reactiveValue } from "@Reptile/Framework";

//import BlankBoilerplate from '~/../public/img/boilerplates/blank_boiler.png';
import "./_ProjectBoilerplateSelect.scss";
import { ENTITY_TYPES } from "@Reptile/Constants/Constants";
import { ICONS } from "@Reptile/Assets";

const _ProjectBoilerplateSelect =
  reactive<Reptile.Props.ProjectBoilerplateSelectProps>(
    (
      { className, style, boilerplates, projectType, currentTemplates },
      { selectedBoilerplate, onBoilerplateSelect }
    ) => {
      const [customTemplates, setCustomTemplates] = useState<Array<any>>([]);

      const createClickHandler = useCallback(
        (boilerplate: Reptile.Models.IBoilerplate | null) => {
          return () => {
            if (onBoilerplateSelect) {
              onBoilerplateSelect(boilerplate);
            }
          };
        },
        [onBoilerplateSelect]
      );

      useEffect(() => {
        const filteredData = currentTemplates.filter(
          (item: any) =>
            item.contentEntityType.entityTypeId === ENTITY_TYPES.Publication &&
            !item.isDeleted
        );
        setCustomTemplates(filteredData);
      }, []);

      return (
        <div
          className={clsx("rt-project-boilerplate-select", className)}
          style={style}
        >
          <div className="title-container">
            <FeaturedIcon
              icon={<FolderPlusIcon />}
              size="lg"
              type="light-circle-outline"
              color="primary"
            />
            <div className="title">
              <Text color="dark-gray" size="large" weight="semibold">
                New Project
              </Text>
              <Text color="light-gray" weight="regular" size="small">
                Please select a template you wish to use.
              </Text>
            </div>
          </div>
          <div className="title-container">
            <div className="title">
              <Text color="dark-gray" size="large" weight="semibold">
                Default Templates
              </Text>
            </div>
          </div>

          <TransitionGroup component={null}>
            {boilerplates.map((boilerplate) => (
              <Collapse key={boilerplate.id}>
                <Card
                  className={clsx("card", projectType)}
                  selected={() =>
                    reactiveValue(selectedBoilerplate)?.id === boilerplate.id
                  }
                  onClick={createClickHandler(boilerplate)}
                >
                  <img
                    className="card-image"
                    src={boilerplate.imageUrl ?? undefined}
                  />
                  <Text
                    className="card-text"
                    color="black"
                    size="medium"
                    weight="medium"
                  >
                    {() => boilerplate.name}
                  </Text>
                </Card>
              </Collapse>
            ))}
          </TransitionGroup>

          <div className="title-container">
            <div className="title">
              <Text color="dark-gray" size="large" weight="semibold">
                Custom Templates
              </Text>
            </div>
          </div>
          <TransitionGroup component={null}>
            {customTemplates.map((boilerplate) => {
              return (
                <Collapse key={boilerplate.id}>
                  <Card
                    className={clsx("card", projectType)}
                    selected={() =>
                      reactiveValue(selectedBoilerplate)?.id === boilerplate.id
                    }
                    onClick={createClickHandler(boilerplate)}
                  >
                    {boilerplate.imageUrl && (
                      <img className="card-image" src={boilerplate.imageUrl} />
                    )}
                    {!boilerplate.imageUrl && (
                      <div className="card-image invalid-image">
                        <img src={ICONS.IMAGE_URL} />
                      </div>
                    )}
                    <Text
                      className="card-text"
                      color="black"
                      size="medium"
                      weight="medium"
                    >
                      {() => boilerplate.name}
                    </Text>
                  </Card>
                </Collapse>
              );
            })}
          </TransitionGroup>
        </div>
      );
    }
  );

export default _ProjectBoilerplateSelect;

/*<Card
                        className={clsx('card', projectType)}
                        selected={() =>
                            reactiveValue(selectedBoilerplate) === null
                        }
                        onClick={createClickHandler(null)}
                    >
                        <img
                            className='card-image'
                            src={BlankBoilerplate as string}
                        />
                        <Text
                            className='card-text'
                            color='black'
                            size='medium'
                            weight='medium'
                        >
                            Blank
                        </Text>
                    </Card>*/
