import {
  Button,
  Image,
  Modal,
  Separator,
  Text,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';
import { UploadProfileModal } from '..';

import './_EditProfile.scss';

const _EditProfile = reactive<Reptile.Props.EditProfile>(
  (
    { avatarUrl, usersPlan, modal, usersFreeTrial },
    { imageUpload, makePayment, handleModal }
  ) => {
    const isExpiringSoon = usersFreeTrial !== undefined && usersFreeTrial >= 0 && usersFreeTrial <= 10;
    return (
      <div className="rt-edit-profile">
        <Image src={() => avatarUrl} form="circle" height={100} width={100} />
        <div className="upload">
          <Button onClick={handleModal}>Update</Button>
          <Separator bottom={20} />
          {isExpiringSoon && (
            <Text size="medium" color="black" weight="semibold">
              {/* {`Trial expires in: ${usersFreeTrial} Days`} */}
              {`Plan is expiring in ${usersFreeTrial} days!`}
            </Text>
          )}
          <Modal visible={modal}>
            <UploadProfileModal
              imageUpload={imageUpload}
              handleModal={handleModal}
            />
          </Modal>
        </div>
        <div className="upgrade">
          {/* state what plan user has */}
          <Text size="small" color="light-gray" weight="regular">
            {`Plan: ${usersPlan}`}
          </Text>
          {/* brings up option for user to purchase account */}
          <Button onClick={makePayment} color="primary" variant="contained">
            Upgrade Plan
          </Button>
        </div>
      </div>
    );
  }
);

export default _EditProfile;
