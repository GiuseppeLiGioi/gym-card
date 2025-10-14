# 🏋️‍♂️ PULSEFIT — Your Personal Digital Trainer

PulseFit è un’app fitness full-stack pensata per gestire allenamenti, schede e progressi in modo semplice, moderno e intuitivo.
L’obiettivo? Offrire un’esperienza completa e personalizzata, accessibile direttamente dal tuo smartphone — o perché no, anche dal browser! 💪📱

---

## 🚀 Funzionalità principali

✅ **Autenticazione JWT** — Login, registrazione e gestione sicura della sessione utente.  
✅ **Gestione utenti** — Creazione e aggiornamento profilo, salvataggio automatico dei dati.  
✅ **CRUD schede & esercizi** — Creazione, modifica, eliminazione e visualizzazione di schede personalizzate.  
✅ **Upload immagini** — Ogni esercizio può avere un’immagine di riferimento.  
✅ **Progress Tracking** — Marcatura esercizi completati e visualizzazione progresso globale.  
✅ **Timer serie & logica completamento** — Timer automatico e stato “scheda completata”.  
✅ **Pannello responsive** — Design **mobile-first**, perfettamente adattabile a ogni dispositivo.  
✅ **Integrazione Stripe (test mode)** — Simulazione del flusso di pagamento per piani premium.  

---

## 🧠 Stack Tecnologico

| **Categoria** | **Tecnologie** |
|----------------|----------------|
| 🎨 **Frontend** | React.js, React Router, Context API, CSS, Toastify |
| ⚙️ **Backend** | Node.js, Express.js |
| 🗄️ **Database** | MySQL, MYSQLWorkBench |
| 🔐 **Auth** | JWT (JSON Web Token) |
| 💳 **Pagamenti** | Stripe API |
| 🧰 **Altri Tools** | Dotenv, Bcrypt, Cors |

---

## 🧩 Architettura del Progetto

PulseFit/
├── client/ # Frontend React
│ ├── assets/
│ │ ├── contexts/ # GlobalContext (gestione token e user)
│ │ ├── components/ # Componenti riutilizzabili
│ │ ├── pages/ # Home, Login, Schede, Checkout ecc.
│ │ ├── styles/ # File CSS modulari
│ └── App.jsx
│
├── server/ # Backend Express
│ ├── routes/ # Rotte API (auth, users, sheets, payments)
│ ├── controllers/ # Logica per ogni risorsa
│ ├── middleware/ # Auth middleware
│ └── db/connection.js # Connessione MySQL
│
└── README.md

## ⚙️ Setup, Installazione e Istruzioni

### 🧩 Clonazione del progetto

# Clona la repository dal tuo GitHub
git clone https://github.com/GiuseppeLiGioi/gym_card.git

# Entra nella cartella principale del progetto
cd gym_card

## 🏗️ Installazione dipendenze
🔹 Backend (server)
cd server
npm install

🔹 Frontend (client)
cd ../client
npm install


## 🧪 Credenziali di test per Stripe

Email: qualsiasi email fittizia

Carta: 4242 4242 4242 4242

Data: qualsiasi futura

CVC: 123



## 📈 Cosa ho imparato / ripassato

Gestione completa autenticazione via token JWT

Creazione di un’architettura client-server strutturata

Implementazione CRUD complessi con upload di immagini

Logiche di progress tracking e UI reattiva

Autenticazione e gestione della sessione utente (token jwt)

Integrazione di API esterne (Stripe)

Ottimizzazione UX responsive mobile-first


## 🧍‍♂️ Autore

**👋 Giuseppe Li Gioi**  
📧 [giuseppe.li.gioi.job@gmail.com](mailto:giuseppe.li.gioi.job@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/giuseppe-li-gioi-327b78378)



