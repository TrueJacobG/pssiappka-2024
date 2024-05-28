import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const ResultPage = () => {
  const router = useRouter();

  const [showQRCode, setShowQRCode] = useState<boolean>(true);

  return (
    <div style={{ textAlign: "center" }}>
      <Image src={"/static/logo.png"} width={75} height={50} alt={"LOGO"} />
      <h1>Pssiappka 2024</h1>
      <h3>
        {router.query.pseudonym} {router.query.emoji}
      </h3>
      <p style={{ marginBottom: "-15px" }}>Twój wynik to: </p>
      <h2>{router.query.code}</h2>
      {showQRCode && router.query.code !== undefined && (
        <Image
          src={`/static/qr_codes/${router.query.code}.png`}
          width={200}
          height={200}
          alt={"QR_CODE"}
          onError={() => setShowQRCode(false)}
        />
      )}
      <p>Zrób ss tej strony! Będziesz tego potrzebować w przyszłości 😉</p>
    </div>
  );
};

export default ResultPage;
