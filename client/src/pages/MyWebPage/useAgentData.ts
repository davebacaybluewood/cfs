import useFetchUserProfile from "admin/hooks/useFetchProfile";

const useAgentData = (userGuid: string) => {
  const { profile, loading } = useFetchUserProfile(userGuid);

  const defaultAvatar =
    "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";
  const avatar =
    profile?.avatar.toString() === "" || loading
      ? defaultAvatar
      : profile?.avatar.toString();
  const Agent = loading
    ? "CFS Agent"
    : `${profile?.firstName} ${profile?.lastName}`;
  const address =
    profile?.state?.toString() === "" ? "-" : profile?.state?.toString();
  const phoneNumber = profile?.phoneNumber.toString();
  const email = profile?.emailAddress;
  const languages = profile?.languages;

  /* Professional Information */
  const licenseNumber = profile?.licenseNumber?.toString();

  /* Socials */
  const facebook = profile?.facebook.toString();
  const linkedIn = profile?.linkedIn.toString();
  const twitter = profile?.twitter.toString();
  const bio = profile?.bio.toString();
  const testimonials = profile?.testimonials;

  return {
    defaultAvatar,
    avatar,
    Agent,
    address,
    phoneNumber,
    email,
    licenseNumber,
    facebook,
    linkedIn,
    twitter,
    loading,
    bio,
    languages,
    testimonials,
    profile,
  };
};

export default useAgentData;
