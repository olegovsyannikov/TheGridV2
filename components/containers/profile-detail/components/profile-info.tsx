'use client';

import { EditProfileInfoOverlay } from '@/components/thegrid-ui/lenses/profileInfo/components/edit-profileInfo-overlay';
import { Button } from '@/components/ui/button';
import { FragmentType, graphql, useFragment } from '@/lib/graphql/generated';

export const ProfileInfoFragment = graphql(`
  fragment ProfileInfoFragment on ProfileInfos {
    id
    name
    tagLine
    descriptionShort
    descriptionLong
    foundingDate
    profileType {
      id
      name
      definition
    }
    profileStatus {
      id
      name
      definition
    }
    profileSector {
      id
      name
      definition
    }
  }
`);

export type ProfileInfoProps = {
  profile: FragmentType<typeof ProfileInfoFragment>;
};

export const ProfileInfo = ({
  profile,
}: ProfileInfoProps) => {
  const profileData = useFragment(ProfileInfoFragment, profile);

  return (
    <EditProfileInfoOverlay
      lensData={profileData}
      triggerNode={
        <Button size="lg" className="ml-auto">
          Edit Profile Info
        </Button>
      }
    />

  );
};
