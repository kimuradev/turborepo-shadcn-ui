export default function ImageLoader({ src }) {
    return `${process.env.NEXT_PUBLIC_ENV_BASE_FRONT_URL}${src}`;
  }