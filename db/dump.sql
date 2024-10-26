--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 14.5 (Debian 14.5-2.pgdg110+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    product_id integer NOT NULL,
    client character varying(255) NOT NULL,
    product character varying(255) NOT NULL,
    total integer NOT NULL,
    status character varying(255) NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
534	Ação
553	Gratuitos para Jogar
560	Indie
565	Estratégia
576	RPG
577	Produção de vídeo
595	Casual
602	Simulação
612	Corrida
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, product_id, client, product, total, status) FROM stdin;
1	10	admin	Counter-Strike	60	Pending
2	40	admin	Deathmatch Classic	4	Pending
3	40	admin	Deathmatch Classic	1699	Pending
4	20	admin	Team Fortress Classic	1699	Pending
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, description, category_id) FROM stdin;
1002	Rag Doll Kung Fu	229	A piece of Steam history - THE FIRST EVER NON VALVE GAME TO APPEAR ON THE STEAM PLATFORM!	560
2400	The Ship: Murder Party	1999	The Ship is a murder mystery multiplayer.	534
3480	Peggle Deluxe	2900	Take your best shot with energizing arcade fun! Aim, shoot, clear the orange pegs, then sit back and cheer as 10 whimsical teachers guide you to Peggle greatness.	595
10	Counter-Strike	2069	Jogue o jogo de ação número 1 no mundo. Junte-se a uma guerra incrivelmente realística contra o terrorismo neste jogo baseado em equipes. Alie-se com os seus colegas e complete missões estratégicas. Acabe com os inimigos. Resgate reféns. A forma como você joga afeta o sucesso da sua equipe. O sucesso da sua equipe afeta você.	534
20	Team Fortress Classic	1699	Um dos jogos de ação on-line mais populares de todos os tempos, Team Fortress Classic apresenta nove classes de personagens — do Medic ao Spy e ao Demolition Man — alistadas em um estilo único de batalha on-line em equipes.	534
30	Day of Defeat	1699	Aliste-se em uma partida intensa de Eixo vs. Aliados estabelecida no Teatro de Operações Europeu na 2ª Guerra Mundial. Os jogadores assumem o papel das classes light/assault/heavy infantry, sniper ou machine-gunner, cada uma com um arsenal único de armamento histórico ao seu dispor. As missões são baseadas em históricas operações-chave.	534
40	Deathmatch Classic	1699	Aprecie partidas multijogadores em ritmo acelerado com Deathmatch Classic (também conhecido como DMC). Sendo o tributo da Valve ao trabalho da id software, DMC convida jogadores a pegar os seus lança-foguetes e testar os seus reflexos numa coleção de locais futurísticos.	534
50	Half-Life: Opposing Force	1699	Retorne a Black Mesa como um dos especialistas encarregados de eliminar Gordon Freeman. Presencie um episódio completamente novo de ação. Encontre oponentes aliens ferozes e prove um armamento totalmente novo. Nomeado como "Jogo do Ano" pela Academia de Artes e Ciências Interativas.	534
60	Ricochet	1699	Um jogo de ação futurista que desafia a sua agilidade assim como a sua mira, Ricochet apresenta partidas de um-contra-um e em equipes em uma variedade de arenas de batalha futuristas.	534
70	Half-Life	2069	Premiado como "Jogo do Ano" por cerca de 50 publicações, o título de estreia da Valve combina ação e aventura com uma tecnologia premiada para criar um mundo assustadoramente realístico onde os jogadores devem pensar para sobreviver. Também inclui um emocionante modo multijogador que lhe permite jogar contra amigos e inimigos pelo mundo.	534
80	Counter-Strike: Condition Zero	2069	Com a sua extensiva campanha Tour of Duty, um número quase ilimitado de modos de combate, atualizações e novo conteúdo em relação à premiada jogabilidade multijogador de Counter-Strike, e mais cerca de 12 missões para um jogador bônus, Counter-Strike: Condition Zero é uma tremenda oferta de conteúdo em modos para um jogador e multijogador	534
130	Half-Life: Blue Shift	1699	Feito pela Gearbox Software e originalmente lançado em 2001 como um complemento de Half-Life, Blue Shift é uma volta às Instalações de Pesquisa Black Mesa na qual você joga como Barney Calhoun, o segurança braço direito de Gordon que o ajudou em muitas situações perigosas.	534
220	Half-Life 2	3299	1998. HALF-LIFE manda um choque na indústria de jogos com sua combinação de ação batedora e história contínua e imersiva. O título de estreia da Valve ganha mais de 50 prêmios de jogo do ano no seu caminho a ser denominado o "Melhor jogo de PC de todos os tempos", pela PC Gamer, e lança uma franquia de mais de oito milhões de...	534
240	Counter-Strike: Source	3299	Counter-Strike: Source blends Counter-Strike's award-winning teamplay action with the advanced technology of Source™ technology.	534
280	Half-Life: Source	3299	Ganhador de mais de 50 prêmios de Jogo do Ano, Half-Life estabeleceu novos padrões para jogos de ação quando foi lançado em 1998. Half-Life: Source é uma versão digitalmente remasterizada do jogo de PC aclamado pela crítica e mais vendido, melhorado com a tecnologia Source para a inclusão de simulação de física, efeitos melhorados, e...	534
300	Day of Defeat: Source	3299	Multiplayer Clássico da Valve de WWII - Agora disponível no Mac.	534
320	Half-Life 2: Deathmatch	1699	Ação multijogador rápida no universo de Half-life 2! A física de HL2 adiciona uma nova dimensão em combate de morte súbita. Jogue no modo morte súbita ou experimente o modo de jogo em equipes Combine contra a Resistência. Lance um vaso sanitário em seu amigo hoje!	534
340	Half-Life 2: Lost Coast	0	Originalmente planejado como uma parte do capítulo Rodovia 17 de Half-Life 2, Lost Coast é uma demonstração jogável de tecnologia que introduz a iluminação High Dynamic Range à engine Source.	534
360	Half-Life Deathmatch: Source	3299	Half-Life Deathmatch: Source é a recriação do primeiro game multiplayer ambientado no universo de Half-life. Apresenta todas as armas originais e os mapas mais jogados, agora rodando no motor Source.	534
380	Half-Life 2: Episode One	2649	Half-life 2 já vendeu 4 milhões de cópias pelo mundo e conquistou até 35 prêmios de Jogo do Ano. Episode One é o primeiro de uma série de jogos que revela o resultado de Half-Life 2 e inicia uma jornada para além da Cidade 17. Também contém dois jogos multijogadores. Não requer Half-Life 2.	534
400	Portal	3299	Portal™ é um novo jogo para um jogador da Valve. Estabelecido nos misteriosos Laboratórios Aperture Science, Portal é aclamado como um dos novos jogos mais inovadores no horizonte e oferecerá aos jogadores horas de jogabilidade única.	534
3910	Sid Meier's Civilization® III Complete	1699	Sid Meier's Civilization III: Complete, the latest offering in the Sid Meier's Civilization III franchise, provides gaming fans with Sid Meier's Civilization III, the highly-addictive journey of discovery.	565
420	Half-Life 2: Episode Two	2649	Half-Life® 2: Episode Two é o segundo jogo de uma nova trilogia criada pela Valve que estende a aventura premiada e sucesso de vendas de Half-Life®. Como o Dr. Gordon Freeman, você foi visto pela última vez saindo da Cidade 17 com Alyx Vance enquanto a Fortaleza entrava em erupção no meio de uma tempestade de proporções...	534
440	Team Fortress 2	0	Nove classes distintas providenciam uma enorme variação de habilidades táticas e personalidades. Constantemente atualizado com novos modos de jogo, mapas, equipamentos e o mais importante: chapéus!	553
500	Left 4 Dead	3299	A Valve (os criadores de Counter-Strike, Half-Life e mais) apresenta Left 4 Dead, um jogo cooperativo de ação e terror para computador e Xbox 360, que lança até quatro jogadores em uma luta épica pela sobrevivência contra hordas de zumbis e terríveis monstros mutantes.	534
550	Left 4 Dead 2	3299	Situado em um apocalipse zumbi, Left 4 Dead 2 (L4D2) é a aguardadíssima sequência do consagrado Left 4 Dead, o jogo cooperativo mais popular de 2008. Este jogo de tiro em primeira pessoa de terror cooperativo leva você e os seus amigos pelas cidades, pântanos e cemitérios do sul dos EUA, começando em Savannah para chegar a Nova Orleans...	534
570	Dota 2	0	Diariamente, milhões de jogadores mundo afora batalham como um dentre os mais de cem heróis do Dota. Estejam jogando há 10 ou 1.000 horas, há sempre algo novo para descobrir. Com atualizações constantes das mecânicas, recursos e heróis, o Dota 2 se tornou mais que um simples jogo.	553
620	Portal 2	449	A "Iniciativa de Testes Perpétuos" foi expandida: crie câmaras cooperativas para você e os seus amigos!	534
630	Alien Swarm	0	Jogo multijogador cooperativo e código-fonte completo disponíveis gratuitamente.	534
730	Counter-Strike 2	0	Há mais de duas décadas, o Counter-Strike oferece uma experiência competitiva de elite moldada por milhões de jogadores mundialmente. Agora, o próximo capítulo da história do CS vai começar. Isso é Counter-Strike 2.	553
1200	Red Orchestra: Ostfront 41-45	1089	Fight in the theatre of war that changed the world forever. Battle alongside your compatriots on some of the most inhospitable environments of the Eastern Front in Red Orchestra: Ostfront 41-45. Red Orchestra places you in the most realistic WWII first-person multi-player combat to date on the PC, allowing the player to fight through...	534
1250	Killing Floor	3499	6-player co-op survival horror at its finest! Free updates, free special events and a ridiculous amount of fun!	534
1300	SiN Episodes: Emergence	2069	Você é John Blade, comandante da HardCorps, uma força de segurança de elite dedicada a proteger as pessoas de Freeport City. Quatro anos se passaram desde sua primeira batalha contra Elexis Sinclaire, uma cientista linda, brilhante e sem piedade que quer remodelar a humanidade à sua visão.	534
1313	SiN: Gold	2069	SiN: Gold has returned! Free update for original owners!	534
1500	Darwinia	3299	Combining fast-paced action with strategic battle planning, Darwinia features a novel and intuitive control mechanism, a graphical style ripped from 80's retro classics like Tron and Defender, and a story concerning a tribe of nomadic sprites trapped in a modern 3D world.	565
1510	Uplink	3299	Play an Uplink Agent who makes a living by hacking into rival computer systems, stealing research data, sabotaging other companies, laundering money, erasing evidence, framing innocent people and constructing the most deadly computer virus ever designed!	565
1520	DEFCON	3299	Inspired by the 1983 cult classic film, Wargames, DEFCON superbly evokes the tension, paranoia and suspicion of the Cold War era, playing on the fascinating aspects of psychological gameplay that occur during strategic nuclear warfare.	565
1530	Multiwinia	3299	Welcome to Multiwinia: Survival of the Flattest the ultimate retro-arcade multiplayer experience! Choose from a selection of six spectacular action-packed game modes, set in one of the most beautiful game environs you will ever set eyes on.	560
1600	Dangerous Waters	4699	S.C.S. - Dangerous Waters permite que você controle várias plataformas aéreas, terrestres e submarinas em um ambiente naval moderno. Assuma o controle direto de estações individuais de tripulação e também planeje e execute diferentes estratégias navais com armas combinadas pela perspectiva de cima do 'Olho do comandante'.	565
1610	Space Empires IV Deluxe	3299	O premiado Space Empires IV Deluxe é a mais recente edição na série Space Empires. Sendo um grande título de estratégia do gênero 4X espaço (explorar, expandir, detonar e exterminar), Space Empires já se encontra no coração dos amantes de jogos de estratégia em todo o mundo.	565
1620	Jagged Alliance 2 Gold	3699	O pequeno país de Arulco foi tomado por um ditador impiedoso - e só você pode afrouxar o punho de ferro! Jagged Alliance 2 Gold Pack faz você mergulhar em um elaborado universo de role-playing onde você interage com mais de 150 personagens, recruta seu próprio bando de soldados e cria seu próprio mercenário personalizado para ganhar...	565
1630	Disciples II: Rise of the Elves 	2049	A premiada série Disciples introduziu um marco na história de muito sucesso do jogo, a introdução de uma nova raça: Os Elfos. A raça élfica acrescentou uma nova dimensão ao jogo e acrescentou inúmeras horas de jogatina. Agora que a série se expandiu ainda mais com Disciples II: Rise Of The Elves.	565
1640	Disciples II: Gallean's Return	2049	Disciples II: Gallean's Return is a compilation edition that includes the base game, Disciples II: Dark Prophecy, plus the two standalone expansions Disciples II: Guardians of the Light and Disciples II: Servants of the Dark.	565
1670	Iron Warriors: T - 72 Tank Command 	2049	O mais devastador tanque a entrar num campo de batalha é seu em Iron Warriors: T72-Tank Command. Este simulador de combate épico permite ao jogador comandar um pelotão inteiro de tanques e TODAS as unidades de suporte associadas ou fazer o papel de qualquer integrante da equipe de um tanque!	565
1690	Space Empires V	3699	Space Empires V é o último lançamento da série Space Empires. Este novo capítulo atualiza completamente a UI e leva o jogador para um universo 3D renderizado em tempo real. Assista à batalhas espaciais em gloriosos detalhes e com efeitos realistas. Expanda, Investigue, Explore e Extermine em uma grande e natural galáxia.	565
1700	Arx Fatalis	849	Este RPG em 1ª pessoa da Arkane Studios aclamado pela crítica, leva o jogador em uma jornada incrível pelo mundo fantástico de Arx. Arx está envolta em caos, à beira da destruição em meio a uma guerra violenta. O sol desapareceu do céu e a escuridão infindável dominou o mundo, forçando humanos e criaturas a habitarem minas subterrâneas.	576
1840	Source Filmmaker	0	O Source Filmmaker (SFM) é a ferramenta de criação de vídeos desenvolvida e usada pela própria Valve para criá-los dentro da engine Source. Como o SFM usa os mesmos recursos do jogo, tudo que existe nele pode ser usado no vídeo e vice-versa.	577
1900	Earth 2160	3299	Popular RTS baseado na série EARTH, com modos de um jogador e multijogador. Depois da destruição da Terra, os líderes da Eurasian Dinasty escaparam e estão agora lutando pela sobrevivência dos seres humanos. Escolha entre quatro facções conflitantes e jogue uma variedade de campanhas de um jogador e modos multijogador.	565
1930	Two Worlds Epic Edition	4699	... 300 anos após o banimento de Aziraal, irmão e irmã se encontram no meio do conflito que irrompeu entre os Orcs e o mundo livre. Kyra, irmã mais nova do herói, desaparece de repente em circunstâncias misteriosas. O herói, um caçador de recompensas, procura por ela em Antaloor.	576
2100	Dark Messiah of Might & Magic	2999	Descubra um novo gênero de Ação-RPG, criado a partir da mais nova versão do Source™ Engine da Valve. Estabelecido no universo de Might & Magic®, jogadores viverão combates ferozes em um ambiente de fantasia e escuridão. Espadas, magias, ataques furtivos. Escolha sua maneira de matar.	534
2200	Quake III Arena	3299	Os maiores guerreiros de todo o tempo e espaço foram chamados para lutar e entreter uma raça alienígena antiga. Use uma variedade de armas e potencializadores ao lutar pela glória contra combatentes implacáveis neste FPS de um jogador e multijogador frenético.	534
2210	Quake 4	3299	Como parte do Rhino Squad, você deve liderar a invasão militar da Terra a um mundo alienígena hostil. Porém, nessa guerra pela sobrevivência da humanidade contra um inimigo implacável, você pode descobrir que a única maneira de derrotá-los... é se tornar um deles.	534
2270	Wolfenstein 3D	0	A Segunda Guerra Mundial está a todo vapor. Os nazistas querem criar um exército mutante e irrefreável. Durante uma missão para roubar planos secretos, você foi capturado e preso. Agora, você tem a chance de escapar, mas há um caminho difícil e nazistas à frente.	534
2280	DOOM + DOOM II	4999	Desenvolvidos pela id Software e originalmente lançados em 1993 e 1994, as versões definitivas e com novas melhorias de DOOM + DOOM II estão disponíveis em um produto combinado!	534
2300	DOOM II	0	O Inferno invadiu a Terra e, para salvá-la, você deve enfrentar demônios mais fortes com armas ainda mais poderosas. Esta adorada sequência ao inovador DOOM (1993) é ainda mais intensa e introduz os jogadores à brutal Superescopeta e ao infame chefe Ídolo do Pecado.	534
2310	Quake	2999	Desenvolvido pela aclamada id Software, Quake® é o revolucionário jogo de tiro em primeira pessoa que inspira os jogos de tiro retrô de hoje em dia. Com Quake (Enhanced), divirta-se com a versão autêntica, atualizada e visualmente aprimorada do original.	534
2320	Quake II	2999	Você é a última esperança da humanidade para deter os Stroggs, alienígenas hostis em guerra contra a Terra. Jogue este FPS militar de ficção científica, agora reformulado para plataformas modernas com um novo visual, novos conteúdos de campanha, modo multijogador online/cooperativo e muito mais.	534
2360	Hexen: Beyond Heretic	899	Enquanto o elfo Sidhe Corvus lutava contra as forças do mal de D'Sparil, os Cavaleiros Serpente restantes estavam corrompendo outras dimensões. Como Guerreiro, Mago ou Clérigo, seu dever é defender o reino de Cronos do segundo Cavaleiro da Serpente conhecido como Korax.	534
2370	Hexen: Deathkings of the Dark Citadel	899	Hexen: Deathkings of the Dark Citadel é uma expansão de tiro em primeira pessoa de fantasia sombria para Hexen: Beyond Heretic. Após encontrar a Esfera do Caos, você é transportado ao Reino dos Mortos. O único caminho de volta está bloqueado pela Cidadela Sombria.	534
2390	Heretic: Shadow of the Serpent Riders	899	Em um reino corrompido pela magia maligna dos três Cavaleiros da Serpente, você é um herege. Como um dos últimos elfos Sidhe, e com habilidades mágicas, você entra em uma missão por vingança contra os que mataram seus amigos, sua família e sua raça inteira.	534
2420	The Ship: Single Player	1999	The Ship is a murder mystery alternative to traditional FPS multiplayer games - hunt and be hunted! Package includes multiplayer, single player and tutorial.	576
2450	Bloody Good Time	1499	Congratulations, you’ve just been cast in your first slasher movie by the notorious Director X!	534
2500	Shadowgrounds	2350	Shadowgrounds breathes fresh air into the action genre with explosive combat sequences, an innovative weapon upgrade system, and an intriguing storyline. The adrenaline-pumping, top-down gameplay and audiovisual fireworks set the scene for this new action experience which also includes single computer (split keyboard or joystick) co-op...	534
2520	Gumboy - Crazy Adventures™	0	Gumboy tem jogabilidade divertida e original em um rico mundo imaginado. Com controles simples, Gumboy permite que o jogador pule, role, flutue e voe através do mundo. E mais, Gumboy pode mudar de tamanho, forma e material.	595
2540	RIP - Trilogy™	1049	With the completion of the third title in the RIP series, the RIP games have become an instant classic in the arcade-shooter genre. RIP  Trilogy brings all three RIP titles into one exciting and heart-pounding pack.RIPNot afraid of Death? What if he is accompanied by Halloween and Rock-N-Roll?	595
2590	Alpha Prime	1999	Em algum lugar do espaço sideral, numa base mineradora aparentemente abandonada no asteróide Alpha Prime, algo deu terrivelmente errado . Mineiros foram avisados que o hubbardium que eles estavam minerando era muito perigoso, mas a ilusão de riquezas inimagináveis era muito forte.	534
2600	Vampire: The Masquerade - Bloodlines	3499	Vampire®: The Masquerade-Bloodlines™ traz uma novo tipo de experiência com - uma que mistura todos os elementos principais de um RPG tradicional com uma riqueza nos gráficos, perigo e combate brutal de um jogo de ação em primeira pessoa. O jogo leva os jogadores para o submundo sombrio e sujo dos vampiros de L.A.	534
2610	GUN™	9190	Quando a vida tira de Colton White tudo o que mais lhe importa, a única coisa em que ele pode confiar é sua arma. Da premiada desenvolvedora de jogos Neversoft e do experiente roteirista Randall Jahnson (A Máscara do Zorro, The Doors), GUN segue Colton em sua busca por informações enquanto procura exercer justiça e vingança sobre aqueles...	534
2630	Call of Duty® 2	9190	Call of Duty® 2 redefines the cinematic intensity and chaos of battle as seen through the eyes of ordinary soldiers fighting together in epic WWII conflicts. The sequel to 2003's Call of Duty, winner of over 80 Game of the Year awards, Call of Duty 2 offers more immense, more intense, more realistic battles than ever before, thanks to...	534
2640	Call of Duty: United Offensive	9190	A premiada desenvolvedora Gray Matter Interactive segue o sucesso de Call of Duty™ da Infinity Ward - ganhador de mais de 80 prêmios de Jogo do Ano e 50 prêmios de Escolha do Editor mundialmente - com Call of Duty™: United Offensive™.	534
2700	RollerCoaster Tycoon® 3: Platinum	0	Rollercoaster Tycoon 3 Platinum combines the excitement of rollercoasters with the fun of a great strategy simulation. RCT3 Platinum combines the roller coaster theme park fun of the Roller Coaster Tycoon 3 with included expansion packs Soaked! and Wild! Now enjoy more options than ever.	602
2710	Act of War: Direct Action	629	A Guerra de Amanhã é AGORATirado das manchetes de hoje, Act of War: Direct Action™ é um assustador conto de suspense, de intrigas internacionais e conflitos militares Geopolíticos. Essa experiência de estratégia em tempo real o coloca diretamente no controle das forças anti-terroristas e mostra um primeiro olhar para a guerra de amanhã.	534
2720	ThreadSpace: Hyperbol	349	ThreadSpace: Hyperbol é um jogo de ação-estratégia ambientado em um futuro distante. Os jogadores lutam entre si em estradas no espaço como pilotos de grandes naves capazes de disparar uma grande variedade de armas. Crie defesas, coordene com sua equipe e lance um ataque contra seus oponentes para conseguir a vitória!	534
2800	X2: The Threat	1699	X²: The Threat é de uma nova geração de jogos de simulação espacial, você joga no papel de Julian Gardna que continua a história iniciada em X: Beyond The Frontier. A engine gráfica atualizada dá um aspecto mais realista com naves e estações recém-projetadas, adicionando à complexidade do universo.	565
2810	X3: Reunion	3299	X3: Reunion continua a saga espacial épica, combinando comércio no espaço profundo e intenso combate em tempo real. Explore um vasto universo, estabeleça seu império e molde a nova fronteira. Com gráficos aprimorados e economias complexas, esta é uma jornada de estratégia, simulação e intriga interestelar.	565
2840	X: Beyond the Frontier	1699	The Human Race had advanced to the point where we could travel among the stars, we developed giant automated machines to help us colonise other worlds, but there was a fault in their programming and they turned and attacked. Forcing us to lay a trap to protect Earth and exiling the Human race to stay on Earth once again.	565
2850	X: Tension	1699	X-Tension é a expansão mais esperada para X: Beyond the Frontier. Esta expansão não está limitada por um enredo linear mas faz uso de novos jeitos de expandir seu império. Agora você pode tomar parte em missões que serão oferecidas a você no decorrer do jogo.	565
2870	X Rebirth	8899	In the distant future, the X universe faces a period of profound and irrevocable change. While the universe stumbles towards an uncertain future, countless adventures await as new enemies rise in search of power.	602
2900	688(I) Hunter/Killer	3299	688 (I) Hunter / Killer, a simulação mais realista de submarino já desenvolvida para PC. Domine os sistemas de controle de sonares e de armas, aprenda a desenvolver situações de alvos reais e equipe seu barco com as mais recentes e avançadas armas.	565
2920	Sub Command	1999	Encarregue-se de controlar os mais mortais submarinos modernos do mundo - três distintos submarinos por duas únicas e desafiantes campanhas. Use tecnologia de última geração de armas e sensores para localizar, encontrar e destruir o inimigo - até atirar mísseis Tomahawks em alvos terrestres.	565
2990	FlatOut 2	3299	Experience the drive of your life as you throw yourself around on and off the track causing fences to shatter, tyre walls explode, water tanks and barrels fly across the track into other cars.	612
3010	Xpand Rally	1699	Xpand Rally is a breathtaking game that gives you the true to life experience of driving powerful rally cars amidst photorealistic sceneries. Realistic weather effects, rolling hills, and animated scenery all add to game's visual perfection.	612
3020	Call of Juarez	2999	Call of Juarez é uma aventura faroeste épica na forma de um jogo de tiro em primeira pessoa. O jogador alterna no papel de dois distintos e antagônicos personagens: o furtivo fugitivo Bill e seu caçador, o reverendo Ray.	534
3050	Xpand Rally Xtreme	1699	Xpand Rally Xtreme shows the true climate and conditions of rally racing. Dangerous, technical tracks, based on the world's hardest special stages full of moguls,jumps,grooves and tight hairpins. By winning races amass funds for faster cars and repairs.	612
3130	Men of War: Red Tide	1699	Men of War: Red Tide é a seqüência aclamada pela crítica do jogo de estratégia em tempo real Men of War. Red Tide introduz uma nova história por campanhas baseadas nos livros do autor soviético Alexander Zorich, que também inclui dezenas de unidades e armas novas ou atualizadas.	565
3170	King's Bounty: Armored Princess	0	King's Bounty: Armored Princess is a sequel to the critically acclaimed King’s Bounty: The Legend.	576
3230	Genesis Rising	849	Três mil anos no futuro, a humanidade cavou um caminho sangrento rumo à dominação do universo conhecido. Autoproclamados uma raça divina e livre de reprovação como uma espécie, eles veem todas as raças alienígenas como inferiores.	565
3260	Safecracker: The Ultimate Puzzle Adventure	1499	Como um arrombador de cofres profissional, você é contratado por uma rica família de um recente falecido para procurar pela mansão por seu testamento. Duncan W. Adams era um ávido colecionador de cofres e, para não dizer muito, "excêntrico". Adams escondeu a escritura das suas vastas riquezas em um dos 35 cofres.	595
3270	Painkiller Overdose	2500	A franquia de FPS aclamada pela crítica e ganhadora de muitos prêmios está de volta! Com modos de um jogador e multijogador cheios de adrenalina e ação desenfreada, Painkiller Overdose traz 6 novas armas demoníacas inovadoras, uma física arrebatadora, mapas descomplicados, mais de 40 monstros insanos e retorcidos do Inferno e chefes...	534
3300	Bejeweled 2 Deluxe	990	With awe-inspiring planetary backdrops, explosive new gems and dazzling special effects, Bejeweled 2 is more wildly addictive than ever before.	595
3310	Chuzzle Deluxe	990	Drag the rows of fuzzy Chuzzles up and down, left and right, to match colors, and they'll pop and return to their test-tube home. Choose from four play modes and two difficulty levels.	595
3320	Insaniquarium Deluxe	990	The craziest aquarium game ever! Tend to your fish, keep them happy and they'll reward you with coins and jewels. Buy tank upgrades or egg parts which hatch different in-tank pets. These pets can help you feed your fish, collect coins, or even protect against the aliens that will invade your tank.	595
3330	Zuma Deluxe	990	Deep in the jungle lie hidden temples bursting with traps and trickery, and it's up to you to uncover their treasures. Fire magical balls from your stone frog idol to make matches of three or more and clear the deadly chain before it reaches the golden skull.	595
3340	AstroPop Deluxe	990	In a world where most puzzle games are the same, head into outer space to find something new and exciting! Before the descending bricks crush your dreams (and your space ship), use your powerful magnet to move and match same-colored bricks.	595
3350	Bejeweled Deluxe	990	In the game, you must swap two adjacent gems to line up three or more of the same jewel type horizontally or vertically to eliminate them. Keep playing until there are no moves left or you've conquered the board. Bejeweled's gameplay can be fun for both kids and adults.	595
3360	Big Money! Deluxe	990	Here's your chance to strike it rich! Grab as much loot as you can before your pile of coins reaches the top of the window. If you move fast enough to fill the money meter, you'll score a moneybag. Collect enough bags, and you'll join the ranks of the rich and famous.	595
3380	Dynomite Deluxe	990	It's prehistoric egg-blasting fun! Use your slingshot to match three or more dino eggs of the same color... and watch them explode! Can you blast all the eggs before Mama Brontosaurus tramples your game?	595
3400	Hammer Heads Deluxe	0	Pesky yard gnomes are invading your lawn! The only way to stop them is with a swift hammer blow to the head. Bash gnomes as quickly as you can while keeping an eye out for special gnomes, prizes and power-ups! Earn gold coins and shop the shiny store for upgrades.	595
3410	Heavy Weapon Deluxe	990	It's shoot-'em-up arcade action at its best! Use an incredible assortment of heavy artillery to blast away enemy tanks and planes, and fight your way to victory. What are you waiting for? Pull yourself up by your bootstraps and get into the action!	595
3420	Iggle Pop Deluxe	990	Journey to the Land of Fuzz to collect colorful Iggles and deliver them to their color-coded destinations. But look out for the nasty Zoogs - they're dying to get their grubby hands on those adorable Iggles.	595
3430	Pizza Frenzy Deluxe	990	Pizza Frenzy is a wacky action puzzler that puts you in charge of your own pizza delivery empire! Reflexes and quick thinking are required to juggle all the orders. This fast-paced game will keep your mouse clicking with rewarding action and pattern matching.	595
3460	Talismania Deluxe	990	King Midas accidentally turned his own daughter into gold! Use his special powers to perform acts of goodness instead of greed. Help Midas connect magical talismans to release gold coins and help the poor. If you help enough people, Zeus will change Midas' daughter back to her old self.	595
3490	Venice Deluxe	0	Venice is sinking and only you can save it! From the floating fortress of your golden gondola, you'll restore the city by returning its lost treasures. Sling costly coins, launch lovely lyres and ricochet ruby rings into the corresponding spaces overhead.	595
3510	Amazing Adventures The Lost Tomb™	990	You are an adventure seeker who travels the world in search of forgotten & lost treasures. Search for hidden objects and circumvent unique puzzle traps to recover the most sought after treasures the world has ever known. A newly-discovered fragment of an ancient map is believed to reveal the location of the Lost Tomb of Egypt.	595
3520	Mystery P.I.™ - The Vegas Heist	990	O roubo do século acabou de acontecer! Você foi contratado pelo cassino para encontrar e devolver o dinheiro roubado antes de sua inauguração em 16 horas. Procure por mais de 2300 objetos muito bem escondidos em 25 locais intrigantes para resolver o Vegas Heist.	595
3540	Peggle™ Nights	2900	Join the Peggle Masters on a dreamtime adventure of alter egos and peg-tastic action. Stay up late to aim, shoot and clear orange pegs, and bask in Extreme Fever glory under the silver moon.	595
3560	Bejeweled Twist	990	Get set for a vivid sensory rush as you spin and match explosive gems for shockwaves of fun. Rotate jewels freely to set up electrifying combos, outwit surprising obstacles like Locks and Bombs, and create high-voltage Flame and Lightning gems.	565
3580	The Wizard's Pen™	990	The Wizard has vanished! The clues to his whereabouts are in his workbook, but all the pages are blank. You'll need the Wizard's magic pen - and your powers of perception - to guess the image on each page. The better your guess, the higher your score, and the closer you are to finding the Wizard.	595
3590	Plants vs. Zombies GOTY Edition	990	Um jogo de ação-estratégia totalmente novo da PopCap, desenvolvedora de Bejeweled e Peggle! Zumbis estão invadindo seu lar e sua única defesa é seu arsenal de plantas! Armado com um viveiro de plantas exterminadoras de zumbis como atiradores de ervilha e bombas de cereja, você precisará pensar rápido e plantar mais rápido para parar...	565
3600	Escape Rosecliff Island	990	An unexpected storm has left you shipwrecked on a mysterious and remote private island. Seek & find cleverly hidden objects and solve puzzles to find a way off the island! Find over 2100 hidden objects in 25 intriguing and mysterious locations to find items that will help you escape!	595
3610	Mystery P.I. - Lost in Los Angeles	990	Procure e encontre o Blockbuster de Hollywood! A única cópia do maior filme blockbuster do ano sumiu um dia antes da primeira apresentação VIP de Hollywood. Você é o mais famoso detetive particular e foi contratado para rastrear e retornar o filme perdido.	595
3620	Zuma's Revenge!	990	An irresistible force has taken our fearless frog to an island where the puzzle-action of Zuma has evolved in amazing ways… but evil spirits and tenacious tiki bosses rule the land! Survive by firing stone spheres to destroy the deadly stream of balls. Conquer over 60 levels!	534
3700	Sniper Elite	1599	As World War II draws to a close, the first covert battles of the Cold War begin. Caught in the life and death struggle between Soviets and Germans in war-torn Berlin, you control the fate of a lone American OSS Sniper.	534
3710	Judge Dredd: Dredd vs. Death	1599	Welcome to Mega-City One, a city of over 400 million people - every one of them a potential criminal. It is the third decade of the 22nd Century, unemployment is widespread, boredom is universal and only the Judges can prevent total anarchy. Empowered to dispense instant justice, they are Judge, Jury and Executioner all in one.	534
3720	Evil Genius	1999	Todos querem dominar o mundo! Consiga poder global com EVIL GENIUS, o único simulador completo de dominação mundial. Todas as tarefas do dia a dia de um gênio deliciosamente malvado estão disponíveis para experimentar e dominar, de construir sua base ultra-secreta a desenvolver espetaculares superarmas para levar a diante seu nefasto...	565
3730	Aliens versus Predator Classic 2000	1699	Aliens Versus Predator Classic 2000 contém campanhas exclusivas de Soldado Colonial, Alien e Predador e com um modo de um jogador frenético de combate do título original: Alien Versus Predator Gold Edition, que foi lançado e aclamado pela crítica em 2000.	534
3800	Advent Rising	2069	A common legend pervades the galaxy-that of a powerful, highly intelligent ancient race that will one day deliver the universe. They are known as Humans. The Advent of Humanity Begins...	534
3900	Sid Meier's Civilization® IV	2999	Com mais de 6 milhões de unidades vendidas e um sucesso de crítica jamais visto de fãs ao redor do mundo, Sid Meier's Civilization é reconhecido como uma das melhores franquias de jogos para PC de todos os tempos.	565
3980	CivCity: Rome	1499	CivCity: Rome, an innovative city builder inspired by the world of Sid Meiers Civilization, and created by a collaboration between Firefly Studios and Firaxis Games, invites players to shift focus from building a multi-city empire and zoom-in on the great cities of the Roman Empire, culminating in Rome itself!	565
3990	Civilization IV®: Warlords	799	Sid Meier's Civilization IV: Warlords é o primeiro pacote de expansão para o jogo premiado que se tornou uma febre mundial instantânea. Fazendo homenagem a alguns dos grandes lideres militares da história, a expansão traz seis cenários únicos e interessantes, dando aos jogadores a chance de mudar o rumo da história com a ajuda da nova e...	565
4000	Garry's Mod	2599	Garry's Mod is a physics sandbox. There aren't any predefined aims or goals. We give you the tools and leave you to play.	560
4230	RACE - The WTCC Game	7299	O jogo oficial da WTCC | RACE é o primeiro jogo focado na ação intensa e pesada do empolgante campeonato WTCC que está explodindo em popularidade por todo o planeta. Baseado no WTCC, um dos três campeonatos oficiais da FIA juntamente com a Fórmula 1 e o WRC, RACE possui a temporada completa de 2006 do campeonato WTCC, todos os carros,...	612
4290	RACE: Caterham Expansion	1049	Celebrating the 50-year anniversary of Caterham Cars Ltd, RACE fans can now expand the WTCC Experience with this exceptional series of classic sportscars. RACE: CATERHAM introduces a total of 60 individual new cars/car skins based on some of the most exciting models in the Caterham sports car range, including the Caterham CSR 200, CSR...	612
4420	Silverfall	1790	Silverfall, antes uma cidade gloriosa, está no fantástico Reino de Nelwë, onde as forças da Tecnologia e da Natureza são fortemente opostas. Sintomas deste terrível conflito começaram a se manifestar fisicamente como orgânicos cyberbiológicos e autômatos movidos a vapor.	576
4560	Company of Heroes - Legacy Edition	6999	Com experiência de jogo visceral na 2ª GM, Company of Heroes redefine os RTS ao trazer à vida o sacrifício de soldados heroicos, ambientes devastados pela guerra e campos de batalha dinâmicos. A versão legacy garante acesso à última versão de COH, chamada de "Company of Heroes”.	565
4850	Cossacks: Back to War	0	Cossacks: Back to War contains all of the gameplay features of Cossacks: European Wars and Cossacks: The Art of War, this is a complete care package for all current and future Cossacks fans. This add-on contains two new nations: Switzerland and Hungary.	565
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role, name) FROM stdin;
2	luan	1234	USER	luan
3	luan	123	USER	luan
4	aaaa	1234	USER	aaaa
1	admin	admin	ADMIN	Ademiro
7	daros	daros	USER	Daros
5		null	USER	null
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 664, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 137, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

