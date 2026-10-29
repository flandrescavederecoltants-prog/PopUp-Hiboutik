
(() => {
  const start = () => {

    // =====================================
    // CONFIGURATION
    // =====================================

    const img = "https://flandrescavederecoltants.hiboutik.com/shop/image.php?img=big_1074-1.jpg";
    const wine = "https://flandrescavederecoltants.hiboutik.com/shop/?page=product&id=1074";
    const shop = "https://flandrescavederecoltants.hiboutik.com/shop/?page=products";

    // =====================================
    // POPUP VIN DE LA SEMAINE
    // =====================================

    let n = (+sessionStorage.getItem("pageCount") || 0) + 1;
    sessionStorage.setItem("pageCount", n);

    if (
      n % 4 === 1 &&
      !document.getElementById("customPopupOverlay")
    ) {
      const popup = document.createElement("div");
      popup.id = "customPopupOverlay";

      popup.style.cssText = `
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

      popup.innerHTML = `
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

      document.body.appendChild(popup);

      setTimeout(() => popup.remove(), 20000);

      popup.addEventListener("click", e => {
        if (e.target.id === "pvA") {
          location.href = wine;
        }

        if (e.target.id === "pvS") {
          location.href = shop;
        }

        if (e.target.id === "pvX") {
          popup.remove();
        }
      });
    }

    // =====================================
    // ICONE DE LA BOUTIQUE
    // =====================================

    const iconUrl = "https://flandrescavederecoltants-prog.github.io/PopUp-Hiboutik/Icone%20Flandres%20Cave%20de%20R%C3%A9coltants.png";

    function setIcon(rel, sizes) {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = iconUrl;
      if (sizes) link.sizes = sizes;
    }

    setIcon("icon", "512x512");
    setIcon("apple-touch-icon", "180x180");

    // =====================================
    // INVITATION ECRAN D'ACCUEIL (MOBILE)
    // Le raccourci avec logo se crée depuis le pont GitHub.
    // =====================================

    const installUrl = "https://flandrescavederecoltants-prog.github.io/PopUp-Hiboutik/boutique.html?installer=1";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    const alreadyAddedKey = "flandresHomeIconAlreadyAdded";
    const shownThisVisitKey = "flandresHomeIconShownThisSession";

    if (
      isMobile &&
      !isStandalone &&
      localStorage.getItem(alreadyAddedKey) !== "yes" &&
      sessionStorage.getItem(shownThisVisitKey) !== "yes" &&
      !document.getElementById("flandresInstallInvite")
    ) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const instructions = isIOS
        ? "Ouvrez notre page d'installation dans Safari, puis utilisez Partager → Sur l'écran d'accueil."
        : "Ouvrez notre page d'installation, puis utilisez le menu de votre navigateur → Ajouter à l'écran d'accueil. Votre raccourci affichera notre logo Flandres.";

      const invite = document.createElement("div");
      invite.id = "flandresInstallInvite";
      invite.setAttribute("role", "dialog");
      invite.setAttribute("aria-label", "Installer le raccourci Flandres");
      invite.style.cssText = `
        position:fixed;
        bottom:16px;
        left:12px;
        right:12px;
        z-index:999998;
        max-width:430px;
        margin:0 auto;
        background:#171717;
        color:white;
        border:1px solid #ff5722;
        border-radius:14px;
        box-shadow:0 6px 25px #0008;
        padding:14px;
        font:14px/1.45 Arial,sans-serif;
        box-sizing:border-box;
      `;

      invite.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
          <img src="${iconUrl}" alt="Logo Flandres"
            style="width:54px;height:54px;object-fit:contain;border-radius:10px;flex-shrink:0;">
          <div>
            <strong style="font-size:15px">🍷 Flandres Cave de Récoltants</strong>
            <div>Retrouvez notre boutique sur l'écran d'accueil avec notre vrai logo !</div>
          </div>
        </div>
        <p style="margin:0 0 12px">${instructions}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;">
          <button type="button" id="flandresLater"
            style="background:#444;color:white;border:0;border-radius:6px;padding:10px;cursor:pointer;">
            Plus tard
          </button>
          <button type="button" id="flandresAlready"
            style="background:#444;color:white;border:0;border-radius:6px;padding:10px;cursor:pointer;">
            Déjà ajouté ✓
          </button>
          <a id="flandresInstallLink" href="${installUrl}"
            style="display:inline-block;background:#ff5722;color:white;border:0;border-radius:6px;padding:10px;text-decoration:none;font-weight:bold;text-align:center;">
            🍷 Installer notre logo
          </a>
        </div>
      `;

      // Une invitation par session ; le popup du vin est prioritaire.
      const showInvite = () => {
        if (document.getElementById("flandresInstallInvite")) return;
        if (document.getElementById("customPopupOverlay")) {
          setTimeout(showInvite, 1500);
          return;
        }
        if (localStorage.getItem(alreadyAddedKey) === "yes") return;

        sessionStorage.setItem(shownThisVisitKey, "yes");
        document.body.appendChild(invite);

        invite.querySelector("#flandresLater").addEventListener("click", () => {
          invite.remove();
        });
        invite.querySelector("#flandresAlready").addEventListener("click", () => {
          localStorage.setItem(alreadyAddedKey, "yes");
          invite.remove();
        });
      };

      setTimeout(showInvite, 4000);
    }

    // =====================================
    // FORMULAIRE DE CONTACT
    // =====================================

    if (document.getElementById("customContactButton")) {
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

    script.onload = () => {

      emailjs.init("0Oia31xdzY1Jhf2Bq");

      const fields = [
        "nom",
        "prenom",
        "email",
        "telephone",
        "sujet",
        "message"
      ];

      const button = document.createElement("div");
      const contactOverlay = document.createElement("div");

      button.id = "customContactButton";
      button.textContent = "📩 Nous contacter";

      button.style.cssText = `
        position:fixed;
        right:0;
        top:50%;
        transform:translateY(-50%);
        background:#ff5722;
        color:#fff;
        padding:12px 18px;
        border-radius:8px 0 0 8px;
        cursor:grab;
        z-index:1000001;
        font-weight:bold;
        touch-action:none !important;
        -ms-touch-action:none;
        user-select:none;
        -webkit-user-select:none;
        -webkit-touch-callout:none;
        box-sizing:border-box;
      `;

      contactOverlay.style.cssText = `
        position:fixed;
        inset:0;
        background:#0009;
        display:none;
        z-index:1000002;
      `;

      contactOverlay.innerHTML = `
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

          ${fields.slice(0, 5).map(x => `
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

      document.body.append(button, contactOverlay);

      // =====================================
      // DÉPLACEMENT TACTILE ET SOURIS
      // =====================================

      const positionKey = "contactButtonPosition";

      const clamp = (value, min, max) =>
        Math.max(min, Math.min(value, max));

      function moveButton(x, y) {

        const maxX = Math.max(
          0,
          window.innerWidth - button.offsetWidth
        );

        const maxY = Math.max(
          0,
          window.innerHeight - button.offsetHeight
        );

        button.style.transform = "none";
        button.style.right = "auto";

        button.style.left =
          clamp(x, 0, maxX) + "px";

        button.style.top =
          clamp(y, 0, maxY) + "px";
      }

      function savePosition() {
        try {
          localStorage.setItem(
            positionKey,
            JSON.stringify({
              x: parseFloat(button.style.left),
              y: parseFloat(button.style.top)
            })
          );
        } catch (e) {}
      }

      // Restaurer la position précédente

      try {
        const saved = JSON.parse(
          localStorage.getItem(positionKey)
        );

        if (
          saved &&
          Number.isFinite(saved.x) &&
          Number.isFinite(saved.y)
        ) {
          moveButton(saved.x, saved.y);
        }
      } catch (e) {}

      let drag = null;
      let ignoreClick = false;

      function beginDrag(x, y, type) {

        const rect = button.getBoundingClientRect();

        drag = {
          type,
          startX: x,
          startY: y,
          left: rect.left,
          top: rect.top,
          moved: false
        };
      }

      function updateDrag(x, y) {

        if (!drag) return;

        const dx = x - drag.startX;
        const dy = y - drag.startY;

        if (Math.hypot(dx, dy) > 5) {
          drag.moved = true;
        }

        if (drag.moved) {
          moveButton(
            drag.left + dx,
            drag.top + dy
          );
        }
      }

      function endDrag() {

        if (!drag) return;

        if (drag.moved) {
          ignoreClick = true;
          savePosition();
        }

        drag = null;
        button.style.cursor = "grab";
      }

      // =====================================
      // GESTION SPÉCIFIQUE SMARTPHONE
      // =====================================

      let activeTouchId = null;

      button.addEventListener("touchstart", e => {

        if (drag || e.touches.length !== 1) return;

        const t = e.changedTouches[0];
        activeTouchId = t.identifier;

        beginDrag(t.clientX, t.clientY, "touch");
        button.style.cursor = "grabbing";

      }, { passive: true });

      button.addEventListener("touchmove", e => {

        if (!drag || drag.type !== "touch") return;

        const t = Array.from(e.changedTouches).find(
          touch => touch.identifier === activeTouchId
        );

        if (!t) return;

        updateDrag(t.clientX, t.clientY);

        if (drag.moved && e.cancelable) {
          e.preventDefault();
        }

      }, { passive: false });

      button.addEventListener("touchend", e => {

        if (!drag || drag.type !== "touch") return;

        const t = Array.from(e.changedTouches).find(
          touch => touch.identifier === activeTouchId
        );

        if (!t) return;

        const moved = drag.moved;
        endDrag();
        activeTouchId = null;

        if (!moved) {
          contactOverlay.style.display = "block";
          ignoreClick = true;
        }

        if (e.cancelable) e.preventDefault();

      }, { passive: false });

      button.addEventListener("touchcancel", () => {

        if (drag && drag.type === "touch") {
          endDrag();
        }

        activeTouchId = null;
      });

      // =====================================
      // GESTION SOURIS ORDINATEUR
      // =====================================

      button.addEventListener("mousedown", e => {

        if (e.button !== 0) return;

        beginDrag(e.clientX, e.clientY, "mouse");
        button.style.cursor = "grabbing";

        e.preventDefault();
      });

      document.addEventListener("mousemove", e => {

        if (!drag || drag.type !== "mouse") return;

        updateDrag(e.clientX, e.clientY);
      });

      document.addEventListener("mouseup", () => {

        if (drag && drag.type === "mouse") {
          endDrag();
        }
      });

      // =====================================
      // CLIC NORMAL : OUVRIR LE FORMULAIRE
      // =====================================

      button.addEventListener("click", e => {

        if (ignoreClick) {
          ignoreClick = false;
          e.preventDefault();
          return;
        }

        if (!drag) {
          contactOverlay.style.display = "block";
        }
      });

      // Garder l'onglet dans l'écran

      window.addEventListener("resize", () => {

        if (button.style.left) {
          const rect = button.getBoundingClientRect();
          moveButton(rect.left, rect.top);
          savePosition();
        }
      });

      // =====================================
      // ENVOI DU FORMULAIRE EMAILJS
      // =====================================

      contactOverlay.addEventListener("click", e => {

        if (
          e.target === contactOverlay ||
          e.target.id === "ctC"
        ) {
          contactOverlay.style.display = "none";
        }

        if (e.target.id === "ctS") {

          const data = Object.fromEntries(
            fields.map(x => [
              x,
              document.getElementById("ct_" + x).value
            ])
          );

          data.to_email =
            "flandres.cavederecoltants@gmail.com";

          emailjs.send(
            "service_ooppol1",
            "template_z7j8s5j",
            data
          )
          .then(() => {
            alert("✅ Message envoyé !");
            contactOverlay.style.display = "none";
          })
          .catch(() => {
            alert("❌ Erreur lors de l'envoi");
          });
        }
      });
    };

    document.head.appendChild(script);
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start
    );
  } else {
    start();
  }
})();
