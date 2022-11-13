/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['i.ibb.co', 'res.cloudinary.com'],
  },
  env: {
    STRIPE_SECRET_KEY:
      'sk_test_51JmmgqDqrHI4t4CEpQrXnAtxg5VzrsNyGlrNB0NofXqalBMnMcIV5qCfQ5sBlRJsiRNAmGFxKOhgang9Tx1DFQSt007HtFxvYi',
    STRIPE_WEBHOOK_SECRET: 'whsec_DM00kieZhWSTJKu5iULiPBHQKA2ny9br',
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY:
      'pk_test_51JmmgqDqrHI4t4CEWEEJ2cwhTGJX4Nhu9G6io5jCCVDeSXg3SoJkti9wApZBXKLmP4ojshAKyq8emersWo8SSffn00WSIb5TZM',
    GOOGLE_CLIENT_SECRET: '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',
    GOOGLE_CLIENT_ID:
      '860776741405-m8h2fm5imvtfjhvsnh088lmi2qljgp89.apps.googleusercontent.com',
    DATABASE_URL:
      'mongodb+srv://sandug:Neuralnet123@rafflr-cluster.yrp9ukj.mongodb.net/test?retryWrites=true&w=majority',
    HOST: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'dfkjghdsflghlsdjfgvdlskfjgdsfhjkldgsvfjkdhsfgildsfuy',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
  experimental: {
    newNextLinkBehavior: true,
  },
  reactStrictMode: false,
};
