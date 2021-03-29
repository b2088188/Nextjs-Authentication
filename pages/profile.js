import UserProfile from "../components/profile/user-profile";
import router from "next/router";
import { getSession } from "next-auth/client";
function ProfilePage() {
  return <UserProfile />;
}

export function getServerSideProps(context) {
  return getSession({ req: context.req }).then((session) => {
    if (!session)
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    return {
      props: {
        session,
      },
    };
  });
}

export default ProfilePage;
