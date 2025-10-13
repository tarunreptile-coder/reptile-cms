import {
    Button,
    FileIcon,
    Modal,
    Separator,
    Text,
} from '@Reptile/Components/Atoms';
import { FileDrop, ModalTitle } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import React from 'react';

const _UploadProfileModal = reactive<Reptile.Props.UploadProfileModalProps>(
    ({}, { imageUpload, handleModal }) => {

        return (
            <>
                <ModalTitle icon={<FileIcon />} title='Upload image' />
                <div style={{ width: '300px' }}>
                    <Text size='small' color='light-gray' weight='regular'>
                        You can upload images up to 256 x 256. Your avatar shows
                        up on your profile and with your team.
                    </Text>
                </div>
                <Separator bottom={20} />
                <FileDrop onFileDropped={(file) => imageUpload(file)} />
                <Separator bottom={20} />
                <Button onClick={handleModal}>Close</Button>
            </>
        );
    }
);

export default _UploadProfileModal;
