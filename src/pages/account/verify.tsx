import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface JwtPayload {
  firstName: string;
  lastName: string;
  email: string;
}

const VerifyEmail = ({ token }) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log(token)
    if (
      jwt.verify(token, process.env.NEXTAUTH_SECRET)
    ) {
      const { email } = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET,
      ) as JwtPayload;
      console.log(email);
      fetch('/api/auth/verifyemail', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const json = res.json();
          console.log(json);
          setIsVerified(true);
        })
        .catch((error) => {
          console.log(error);
          setIsVerified(false);
        });
    }
  }, [token]);

  return (
    <div>
      {!isVerified ? (
        <div>
          <h1>Some kind of error occured!</h1>
          {/* <Link href="/auth/signin">Sign in</Link> */}
        </div>
      ) : (
        <div>
          <h1>Email is verified!</h1>
          <Link href="/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
};

VerifyEmail.getInitialProps = async ({ query }) => {
  const { token } = query;
  return { token }
};

export default VerifyEmail;
