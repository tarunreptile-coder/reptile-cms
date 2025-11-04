import { Separator, Text, Trash2Icon, ErrorIcon } from '@Reptile/Components/Atoms';
import { ModalTitle } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./_DeleteThemeModal.scss";

const _DeleteThemeModal = reactive<Reptile.Props.ModalThemeProps>(
    ({ actionEnabled, publicationName, isActive, publicationId }, { onCancelClick, onActionClick }) => {
        const navigate = useNavigate();
        
        const handleAction = () => {
            return actionEnabled === 'pending';
        };

        return (
            <>
                <ModalTitle icon={isActive ? <ErrorIcon /> : <Trash2Icon />} title={!isActive ? 'Confirmation' : 'Cannot Delete Theme'} />
                <Separator bottom={30} />
                <ModalContent>
                    {!isActive && (
                        <Text color={'black'}>{'Are you sure you want to delete this Theme?'}</Text>
                    )}
                    {isActive && (
                        <>
                            <Text color="black">
                                {`This theme is currently associated with the publication${publicationName ? ':' : '.'}`}
                            </Text>
                            {publicationName && (
                                <>
                                    <Separator bottom={20} />
                                    <div className="register-link">
                                        <div onClick={() => navigate(`/publication/${publicationId}`)}>
                                            <Text style={{textAlign:'center'}} size={'large'} color="black" weight={'bold'}>{publicationName}</Text>
                                        </div>
                                    </div>
                                    
                                </>
                            )}
                            <Separator bottom={20} />
                            <Text color="black">
                                {'You cannot delete the theme while it is in use. To proceed, either delete the publication, or assign a different theme to it.'}
                            </Text>
                        </>
                    )}
                </ModalContent>
                <Separator bottom={50} />
                <ModalActions
                    onCancelClick={onCancelClick}
                    onDeleteClick={onActionClick}
                    actionEnabled={handleAction}
                    onDelete={!isActive}
                    {...(isActive && {
                        onActionClick: () => onCancelClick(),
                        actionName: 'OK',
                    })}
                />
            </>
        );
    }
);

export default _DeleteThemeModal;
