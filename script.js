
(() => {
  const start = () => {
    // CONFIGURATION
    const img = "https://flandrescavederecoltants.hiboutik.com/shop/image.php?img=big_1074-1.jpg";
    const wine = "https://flandrescavederecoltants.hiboutik.com/shop/?page=product&id=1074";
    const shop = "https://flandrescavederecoltants.hiboutik.com/shop/?page=products";

    // POPUP : UNE FOIS TOUTES LES 4 VISITES DE PAGES
    let n = (+sessionStorage.getItem("pageCount") || 0) + 1;
    sessionStorage.setItem("pageCount", n);

    if (n % 4 === 1 && !document.getElementById("customPopupOverlay")) {
      const o = document.createElement("div");
      o.id = "customPopupOverlay";

      o.style.cssText = `
        position:fixed;
        inset:0;
        width:100%;
        height:100%;
        background:#0009;
        z-index:999999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:12px;
        box-sizing:border-box;
      `;

      o.innerHTML = `
        <style>
          #pvBox {
            position:relative;
            display:flex;
            flex-direction:row;
            align-items:center;
            width:94%;
            max-width:720px;
            max-height:90vh;
            background:#111;
            border-radius:12px;
            box-shadow:0 10px 30px #0006;
            overflow:hidden;
            box-sizing:border-box;
          }

          #pvImageZone {
            width:45%;
            padding:20px 12px;
            display:flex;
            align-items:center;
            justify-content:center;
            box-sizing:border-box;
            flex-shrink:0;
            min-width:0;
          }

          #pvImage {
            display:block;
            width:auto;
            height:auto;
            max-width:100%;
            max-height:calc(90vh - 40px);
            object-fit:contain;
            border:2px solid #ff5722;
            border-radius:8px;
            box-sizing:border-box;
          }

          #pvContent {
            width:55%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            background:#111;
            color:white;
            padding:20px 15px;
            box-sizing:border-box;
            text-align:center;
            min-width:0;
          }

          #pvTitle {
            font-size:clamp(18px,3vw,26px);
            line-height:1.4;
            margin:0 0 20px;
            color:white;
            font-weight:bold;
          }

          #pvButtons {
            display:flex;
            flex-direction:row;
            gap:8px;
            justify-content:center;
            align-items:center;
            width:100%;
          }

          #pvA, #pvS {
            flex:1;
            min-width:0;
            padding:12px 8px;
            font-size:clamp(11px,1.8vw,15px);
            border:0;
            background:#ff5722;
            color:white;
            border-radius:5px;
            cursor:pointer;
            white-space:normal;
          }

          #pvA:hover, #pvS:hover {
            background:#e64a19;
          }

          #pvX {
            position:absolute;
            top:8px;
            right:12px;
            font-size:24px;
            cursor:pointer;
            color:white;
            z-index:10;
            line-height:1;
          }

          @media(max-width:600px) {
            #pvBox {
              flex-direction:column;
              width:94%;
              max-width:400px;
              max-height:94vh;
              overflow-y:auto;
            }

            #pvImageZone {
              width:100%;
              padding:15px 15px 5px;
            }

            #pvImage {
              max-width:100%;
              max-height:45vh;
            }

            #pvContent {
              width:100%;
              padding:12px 15px 20px;
            }

            #pvTitle {
              font-size:18px;
              margin:0 0 15px;
            }

            #pvA, #pvS {
              font-size:12px;
              padding:12px 6px;
            }

            #pvX {
              top:8px;
              right:10px;
              text-shadow:0 1px 4px #000;
            }
          }
        </style>

        <div id="pvBox">

          <div id="pvImageZone">
            <img
              id="pvImage"
              src="${img}"
              alt="Le vin de la semaine"
            >
          </div>

          <div id="pvContent">

            <h2 id="pvTitle">
              ⚠️ Chaque Semaine, Opération
              1 Semaine / 1 Vin ⚠️
            </h2>

            <div id="pvButtons">

              <button id="pvA">
                Le Vin de la Semaine
              </button>

              <button id="pvS">
                Vers le Site
              </button>

            </div>

          </div>

          <div id="pvX">✖</div>

        </div>
      `;

      document.body.appendChild(o);

      // FERMETURE AUTOMATIQUE APRÈS 20 SECONDES
      setTimeout(() => o.remove(), 20000);

      // ACTIONS DES BOUTONS
      o.addEventListener("click", e => {
        const target = e.target;

        if (target.id === "pvA") {
          location.href = wine;
        }

        if (target.id === "pvS") {
          location.href = shop;
        }

        if (target.id === "pvX") {
          o.remove();
        }
      });
    }

    // FORMULAIRE DE CONTACT EMAILJS
    if (document.getElementById("customContactButton")) return;

    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

    s.onload = () => {
      emailjs.init("0Oia31xdzY1Jhf2Bq");

      const f = [
        "nom",
        "prenom",
        "email",
        "telephone",
        "sujet",
        "message"
      ];

      const b = document.createElement("div");
      const o = document.createElement("div");

      b.id = "customContactButton";
      b.textContent = "📩 Nous contacter";

      b.style.cssText = `
        position:fixed;
        right:0;
        top:50%;
        transform:translateY(-50%);
        background:#ff5722;
        color:#fff;
        padding:12px 18px;
        border-radius:8px 0 0 8px;
        cursor:pointer;
        z-index:999999;
        font-weight:bold;
      `;

      o.style.cssText = `
        position:fixed;
        inset:0;
        background:#0009;
        display:none;
        z-index:999999;
      `;

      o.innerHTML = `
        <div style="
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          background:#fff;
          padding:20px;
          border-radius:10px;
          width:90%;
          max-width:500px;
          max-height:90vh;
          overflow-y:auto;
          box-shadow:0 10px 30px #0006;
          box-sizing:border-box;
        ">

          <h2 style="text-align:center">
            Contactez-nous
          </h2>

          ${f.slice(0, 5).map(x => `
            <input
              id="ct_${x}"
              placeholder="${x}"
              style="
                width:100%;
                margin:5px 0;
                padding:8px;
                box-sizing:border-box;
              "
            >
          `).join("")}

          <textarea
            id="ct_message"
            placeholder="Votre message / votre demande"
            style="
              width:100%;
              margin:5px 0;
              padding:8px;
              height:100px;
              box-sizing:border-box;
            "
          ></textarea>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-top:10px;
          ">

            <button id="ctC" style="
              padding:10px;
              background:#999;
              color:#fff;
              border:0;
              border-radius:5px;
              cursor:pointer;
            ">
              Annuler
            </button>

            <button id="ctS" style="
              padding:10px;
              background:#ff5722;
              color:#fff;
              border:0;
              border-radius:5px;
              cursor:pointer;
            ">
              Envoyer
            </button>

          </div>
        </div>
      `;

      document.body.append(b, o);

      b.onclick = () => {
        o.style.display = "block";
      };

      o.onclick = e => {
        if (e.target === o || e.target.id === "ctC") {
          o.style.display = "none";
        }

        if (e.target.id === "ctS") {
          const d = Object.fromEntries(
            f.map(x => [
              x,
              document.getElementById("ct_" + x).value
            ])
          );

          d.to_email = "flandres.cavederecoltants@gmail.com";

          emailjs.send(
            "service_ooppol1",
            "template_z7j8s5j",
            d
          )
          .then(() => {
            alert("✅ Message envoyé !");
            o.style.display = "none";
          })
          .catch(() => {
            alert("❌ Erreur lors de l'envoi");
          });
        }
      };
    };

    document.head.appendChild(s);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
