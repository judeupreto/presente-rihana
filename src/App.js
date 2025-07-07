import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const screens = {
  START: 'start',
  DECLARATION: 'declaration',
  MEMORIES: 'memories',
  VIDEO: 'video',
  BRYAN_CORE: 'bryan_core',
  RIHANA_CORE: 'rihana_core',
  SECRET: 'secret',
  LOVE: 'love',
};

const declarationText = `Amor, eu sei que às vezes posso falhar,
mas nunca deixo de tentar ser o melhor pra você.

Talvez eu não seja o melhor com presentes,
mas esse aqui eu fiz com todo carinho e dedicação.

Quero que você saiba que te amo muito.
Você é o bem mais precioso que eu tenho...

Tirando minha bicicleta, né —
mas fica na paz que você também tem um lugar especial guardado no meu coração.

Eu te amo muito, meu amor.
Demais mesmo, sua gostosa. 💜`;

const memoriesList = [
  'Nosso primeiro selinho no parque',
  'No dia depois do Dia dos Namorados, aquele dia foi incrível',
  'Quando minha carroça (bicicleta) quebrou sem querer, e você nem me ajudou',
  'Meu primeiro presente: o colar da Marca do Sacrifício de Berserk, numa caixinha especial',
];

const photos = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg'];

const bryanData = {
  nome: 'Bryan Core',
  foto: 'bryan.jpg',
  descricao: 'Aqui é eu, lindo e todo chave de quebrada.',
  youtuber: {
    nome: 'Rulio',
    foto: 'youtuber_bryan.jpg',
    texto:
      'Eu gosto do canal do Rulio porque ele faz uns bagulhos insanos: arma de pregos que dispara de verdade, drones “bomba” e torretas automáticas que funcionam sem apertar nada. É como ver um laboratório improvisado onde eletrônica, mecânica e programação se unem. Cada vídeo me inspira a estudar ainda mais os assuntos que eu gosto, para depois colocar tudo em prática.',
  },
  artista: {
    nome: 'Kaskão',
    foto: 'kaskao.jpg',
    texto:
      'Kaskão é um produtor de beats que trouxe o peso do gueto para as caixas de som. Influenciado pelo rap consciente e pelas batidas pesadas, ele cria trilhas sonoras que ecoam histórias das ruas, misturando samples crús e percussão marcante. Suas produções têm aquele punch urbano que faz qualquer um sentir a energia do gueto, perfeito pra quem curte um som verdadeiro e cheio de atitude.',
  },
};

const rihanaData = {
  nome: 'Rihana Core',
  foto: 'rihana.jpg',
  descricao: 'Essa é minha namorada: linda, gostosa e toda das trevas — uma verdadeira trevosa encantadora. Confesso que tenho um cagaço dela às vezes 😅, mas é justamente isso que me faz amar ainda mais. É o caos e o charme em forma de mulher. Minha gótica suprema, meu amor eterno. 💜',
  youtuber: {
    nome: 'Canal da Rihana',
    foto: 'youtuber_rihana.jpg',
    texto:
      'O JF é meu canal preferido porque é composto por pessoas que eu gosto muito e acompanho faz um tempo, principalmente o Gemaplys. Sou muito fã das músicas e do conteúdo desse cara. O JF é um canal bem avulso que eu assisto mais pra me divertir, porque gameplay falta.',
  },
  artista: {
    nome: 'Artista da Rihana',
    foto: 'artista_rihana.jpg',
    texto:
      'O System é a minha banda preferida porque sou fã das músicas e dos artistas, tirando o Jonh, que é de direita mas eu finjo que não sei disso às vezes. Muitas das músicas do SOAD se tratam de política, como forma de protesto, e isso é o que eu mais admiro neles.',
  },
};

function CoreScreen({ data, onBack, onNext }) {
  return (
    <div className="screen core-screen active" style={{ textAlign: 'center' }}>
      <h2 className="pixacao-text">{data.nome}</h2>
      <img
        src={data.foto}
        alt={`${data.nome} foto`}
        style={{ maxWidth: '300px', borderRadius: '15px', boxShadow: '0 0 15px #ff00ffaa', margin: '20px 0' }}
      />
      <p style={{ margin: '0 auto 30px', maxWidth: '500px', lineHeight: 1.5 }}>{data.descricao}</p>
      <div style={{ marginBottom: 20 }}>
        <h3>Youtuber favorito</h3>
        <img
          src={data.youtuber.foto}
          alt={data.youtuber.nome}
          style={{ maxWidth: '250px', borderRadius: '15px', boxShadow: '0 0 15px #ff00ffaa' }}
        />
        <p style={{ marginTop: 10, maxWidth: '400px', margin: '10px auto', lineHeight: 1.4 }}>{data.youtuber.texto}</p>
      </div>
      <div style={{ marginBottom: 30 }}>
        <h3>Artista / Banda favorita</h3>
        <img
          src={data.artista.foto}
          alt={data.artista.nome}
          style={{ maxWidth: '250px', borderRadius: '15px', boxShadow: '0 0 15px #ff00ffaa' }}
        />
        <p style={{ marginTop: 10, maxWidth: '400px', margin: '10px auto', lineHeight: 1.4 }}>{data.artista.texto}</p>
      </div>
      <div>
        {onBack && (
          <button className="btn" onClick={onBack} style={{ marginRight: 10 }}>
            Voltar
          </button>
        )}
        {onNext && <button className="btn" onClick={onNext}>Próximo</button>}
      </div>
    </div>
  );
}

function LoveScreen() {
  useEffect(() => {
    confetti({ particleCount: 150, spread: 120, origin: { y: 0.6 } });
  }, []);

  return (
    <div className="screen core-screen active" style={{ textAlign: 'center' }}>
      <h2 className="pixacao-text">É brincadeira meu amoooor</h2>
      <p style={{ fontSize: '1.4rem', marginBottom: '30px' }}>Eu te amo muito 💜</p>
      <h3 style={{ fontSize: '1.8rem' }}>✨ FIM ✨</h3>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(screens.START);
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const audioRef = useRef(null);
  const declarationAudioRef = useRef(null);

  useEffect(() => {
    if (screen === screens.DECLARATION && charIndex < declarationText.length) {
      const char = declarationText.charAt(charIndex);
      const delay = char === '\n' ? 400 : 40;
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + char);
        setCharIndex((i) => i + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, screen]);

  useEffect(() => {
    if (screen !== screens.DECLARATION) {
      setTypedText('');
      setCharIndex(0);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === screens.MEMORIES) {
      setPhotoIndex(0);
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [screen]);

  useEffect(() => {
    if (screen === screens.DECLARATION) {
      declarationAudioRef.current?.play();
    } else {
      declarationAudioRef.current?.pause();
      if (declarationAudioRef.current) declarationAudioRef.current.currentTime = 0;
    }
  }, [screen]);

  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <div
      className="app"
      style={{
        background: `linear-gradient(135deg, rgba(106,13,173,0.7), rgba(187,77,233,0.3)), url('/fundo.jpg') center/cover no-repeat`,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'column',
      }}
    >
      {screen === screens.START && (
        <div className="screen start-screen active" style={{ textAlign: 'center' }}>
          <h1 className="pixacao-text">Presente pra menina mais linda do mundo</h1>
          <p className="pixacao-subtitle">Eu te amo muito meu amor, espero que goste</p>
          <button className="btn" onClick={() => setScreen(screens.DECLARATION)}>Iniciar</button>
        </div>
      )}

      {screen === screens.DECLARATION && (
        <div className="screen declaration-screen active" style={{ textAlign: 'center' }}>
          <audio
            ref={declarationAudioRef}
            src="neguinho_kaxeta.mp3"
            loop={false}
            autoPlay
            style={{ display: 'none' }}
          />
          <div className="typed-text">{typedText || '\u00A0'}</div>
          {charIndex >= declarationText.length && (
            <button className="btn" onClick={() => setScreen(screens.MEMORIES)}>Ver memórias</button>
          )}
        </div>
      )}

      {screen === screens.MEMORIES && (
        <div className="screen memories-screen active" style={{ textAlign: 'center' }}>
          <h2 className="pixacao-text">Nossas memórias</h2>
          <ul style={{ textAlign: 'left', marginBottom: 20 }}>
            {memoriesList.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          <div className="photo-carousel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="btn" onClick={prevPhoto}>◀</button>
            <img src={photos[photoIndex]} alt="" style={{ maxWidth: 300, margin: '0 10px', borderRadius: 12 }} />
            <button className="btn" onClick={nextPhoto}>▶</button>
          </div>
          <audio ref={audioRef} controls src="tribalistas_alianca.mp3" style={{ width: '100%', marginTop: 20 }} />
          <button className="btn" onClick={() => setScreen(screens.VIDEO)} style={{ marginTop: 30 }}>
            Ver vídeo
          </button>
        </div>
      )}

      {screen === screens.VIDEO && (
        <div className="screen video-screen active" style={{ textAlign: 'center' }}>
          <h2 className="pixacao-text">Vídeo do casal mais lindo de todo universo</h2>
          <video
            controls
            autoPlay
            muted={false}
            style={{ maxWidth: '100%', borderRadius: 15 }}
          >
            <source src="/video_casal.mp4" type="video/mp4" />
            Seu navegador não suporta o vídeo :(
          </video>
          <button className="btn" onClick={() => setScreen(screens.BRYAN_CORE)} style={{ marginTop: 20 }}>
            Próxima
          </button>
        </div>
      )}

      {screen === screens.BRYAN_CORE && (
        <CoreScreen
          data={bryanData}
          onBack={() => setScreen(screens.VIDEO)}
          onNext={() => setScreen(screens.RIHANA_CORE)}
        />
      )}

      {screen === screens.RIHANA_CORE && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <CoreScreen data={rihanaData} onBack={() => setScreen(screens.BRYAN_CORE)} onNext={null} />
          <button className="btn" onClick={() => setScreen(screens.SECRET)} style={{ marginTop: 20 }}>
            ......
          </button>
        </div>
      )}

      {screen === screens.SECRET && (
        <div className="screen core-screen active" style={{ textAlign: 'center' }}>
          <h2 className="pixacao-text">🕵️ Tela Secreta</h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>
            Para liberar essa tela... mande a foto do peito 👀
          </p>
          <button className="btn" onClick={() => setScreen(screens.LOVE)}>Prosseguir</button>
        </div>
      )}

      {screen === screens.LOVE && <LoveScreen />}
    </div>
  );
}
