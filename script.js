
(() => {
  "use strict";

  const start = () => {

    // ==========================================
    // 1. CONFIGURATION GÉNÉRALE
    // ==========================================

    const BASE =
      "https://flandrescavederecoltants-prog.github.io/PopUp-Hiboutik/";

    const iconUrl =
      BASE + "flandres-icone-ronde-512.png?v=3";

    const installUrl =
      BASE + "boutique.html?installer=1";

    const wineImage =
      "https://flandrescavederecoltants.hiboutik.com/shop/image.php?img=big_1074-1.jpg";

    const wineUrl =
      "https://flandrescavederecoltants.hiboutik.com/shop/?page=product&id=1074";

    const shopUrl =
      "https://flandrescavederecoltants.hiboutik.com/shop/?page=products";


    // ==========================================
    // 2. POPUP : 1 SEMAINE / 1 VIN
    // ==========================================

    let pageCount =
      Number(sessionStorage.getItem("pageCount") || 0) + 1;

    sessionStorage.setItem("pageCount", pageCount);

    if (
      pageCount % 4 === 1 &&
      !document.getElementById("customPopupOverlay")
    ) {

      const popup = document.createElement("div");
      popup.id = "customPopupOverlay";

      popup.style.cssText = `
        position:fixed;
        inset:0;
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
            max-width:100%;
            max-height:calc(90vh - 40px);
            width:auto;
            height:auto;
            object-fit:contain;
            border:2px solid #ff5722;
            border-radius:8px;
            box-sizing:border-box;
          }

          #pvContent {
            width:55%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:20px 15px;
            background:#111;
            color:white;
            text-align:center;
            box-sizing:border-box;
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

          #pvX {
            position:absolute;
            top:8px;
            right:12px;
            font-size:24px;
            color:white;
            cursor:pointer;
            z-index:10;
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
          }
        </style>

        <div id="pvBox">
          <div id="pvImageZone">
            <img
              id="pvImage"
              src="${wineImage}"
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

      popup.addEventListener("click", event => {
        if (event.target.id === "pvA") {
          window.location.href = wineUrl;
        }

        if (event.target.id === "pvS") {
          window.location.href = shopUrl;
        }

        if (
          event.target.id === "pvX" ||
          event.target === popup
        ) {
          popup.remove();
        }
      });
    }


    // ==========================================
    // 3. LOGO DE LA BOUTIQUE
    // ==========================================

    // Corrige l'icône affichée par le navigateur.
    // Pour le raccourci Android, le pont GitHub
    // et son manifeste restent indispensables.

    function setIcon(rel, url, sizes) {
      let link =
        document.querySelector(`link[rel="${rel}"]`);

      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }

      link.href = url;

      if (sizes) {
        link.setAttribute("sizes", sizes);
      }
    }

    setIcon("icon", iconUrl, "512x512");

    setIcon(
      "apple-touch-icon",
      BASE + "flandres-icone-ronde-180.png?v=3",
      "180x180"
    );


    // ==========================================
    // 4. INVITATION À INSTALLER LE RACCOURCI
    // ==========================================

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

    const isStandalone =
      window.matchMedia("(display-mode: standalone)")
        .matches ||
      window.navigator.standalone === true;

    const alreadyAddedKey =
      "flandresHomeIconAlreadyAdded";

    const shownThisVisitKey =
      "flandresHomeIconShownThisSession";

    if (
      isMobile &&
      !isStandalone &&
      localStorage.getItem(alreadyAddedKey) !== "yes" &&
      sessionStorage.getItem(shownThisVisitKey) !== "yes" &&
      !document.getElementById("flandresInstallInvite")
    ) {

      const isIOS =
        /iPhone|iPad|iPod/i.test(navigator.userAgent);

      const instructions = isIOS
        ? "Ouvrez notre page d'installation dans Safari, puis choisissez Partager → Sur l'écran d'accueil."
        : "Ouvrez notre page d'installation, puis utilisez le menu de votre navigateur → Ajouter à l'écran d'accueil.";

      const invite = document.createElement("div");

      invite.id = "flandresInstallInvite";

      invite.setAttribute("role", "dialog");
      invite.setAttribute(
        "aria-label",
        "Installer le raccourci Flandres"
      );

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
        <div style="
          display:flex;
          align-items:center;
          gap:12px;
          margin-bottom:10px;
        ">
          <img
            src="${iconUrl}"
            alt="Logo Flandres"
            style="
              width:54px;
              height:54px;
              object-fit:contain;
              border-radius:10px;
              flex-shrink:0;
            "
          >

          <div>
            <strong style="font-size:15px">
              🍷 Flandres Cave de Récoltants
            </strong>

            <div>
              Retrouvez notre boutique sur votre
              écran d'accueil avec notre vrai logo !
            </div>
          </div>
        </div>

        <p style="margin:0 0 12px">
          ${instructions}
        </p>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          justify-content:flex-end;
        ">
          <button
            type="button"
            id="flandresLater"
            style="
              background:#444;
              color:white;
              border:0;
              border-radius:6px;
              padding:10px;
              cursor:pointer;
            "
          >
            Plus tard
          </button>

          <button
            type="button"
            id="flandresAlready"
            style="
              background:#444;
              color:white;
              border:0;
              border-radius:6px;
              padding:10px;
              cursor:pointer;
            "
          >
            Déjà ajouté ✓
          </button>

          <a
            id="flandresInstallLink"
            href="${installUrl}"
            style="
              display:inline-block;
              background:#ff5722;
              color:white;
              border-radius:6px;
              padding:10px;
              text-decoration:none;
              font-weight:bold;
              text-align:center;
            "
          >
            🍷 Installer notre logo
          </a>
        </div>
      `;

      const showInvite = () => {

        if (
          document.getElementById(
            "flandresInstallInvite"
          )
        ) {
          return;
        }

        // Le popup du vin passe en priorité.
        if (
          document.getElementById(
            "customPopupOverlay"
          )
        ) {
          setTimeout(showInvite, 1500);
          return;
        }

        if (
          localStorage.getItem(alreadyAddedKey) === "yes"
        ) {
          return;
        }

        sessionStorage.setItem(
          shownThisVisitKey,
          "yes"
        );

        document.body.appendChild(invite);

        invite.querySelector("#flandresLater")
          .addEventListener("click", () => {
            invite.remove();
          });

        invite.querySelector("#flandresAlready")
          .addEventListener("click", () => {
            localStorage.setItem(
              alreadyAddedKey,
              "yes"
            );
            invite.remove();
          });
      };

      setTimeout(showInvite, 4000);
    }


    // ==========================================
    // 5. FORMULAIRE DE CONTACT EMAILJS
    // ==========================================

    if (
      document.getElementById(
        "customContactButton"
      )
    ) {
      return;
    }

    const emailScript =
      document.createElement("script");

    emailScript.src =
      "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

    emailScript.onload = () => {

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
      const overlay = document.createElement("div");

button.id = "customContactButton";
button.innerHTML = `
  <span style="
    position:absolute !important;
    left:0 !important;
    top:0 !important;
    width:100% !important;
    height:100% !important;
    margin:0 !important;
    padding:0 !important;
    transform:translateY(-4px) !important;
    display:flex !important;
    flex-direction:column !important;
    align-items:center !important;
    justify-content:center !important;
    gap:2px !important;
    box-sizing:border-box !important;
    pointer-events:none !important;
  ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      style="
        display:block !important;
        width:23px !important;
        height:23px !important;
        flex:none !important;
        margin:0 !important;
        padding:0 !important;
      "
    >
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m2 6 10 7 10-7"/>
    </svg>

    <span style="
      display:block !important;
      font-family:Arial,sans-serif !important;
      font-size:10px !important;
      font-weight:bold !important;
      line-height:12px !important;
      height:12px !important;
      margin:0 !important;
      padding:0 !important;
      text-align:center !important;
      flex:none !important;
    ">Contact</span>
  </span>
`;
      button.setAttribute(
  "aria-label",
  "Nous contacter"
);

button.title = "Nous contacter";

button.style.cssText = `
  position:fixed;
  right:8px;
  top:50%;
  transform:translateY(-50%);
  background:#ff5722;
  color:white;
  width:56px;
  height:56px;
  padding:0;
  border:2px solid white;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:Arial,sans-serif;
  font-size:30px;
  font-weight:bold;
  line-height:1;
  box-shadow:0 3px 12px rgba(0,0,0,0.25);
  cursor:grab;
  z-index:1000001;
  touch-action:none !important;
  user-select:none;
  -webkit-user-select:none;
  -webkit-touch-callout:none;
  box-sizing:border-box;
`;

      overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:#0009;
        display:none;
        z-index:1000002;
      `;

      overlay.innerHTML = `
        <div style="
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          background:white;
          color:#222;
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

          ${fields.slice(0, 5).map(field => `
            <input
              id="ct_${field}"
              placeholder="${field}"
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
            <button
              id="ctC"
              style="
                padding:10px;
                background:#999;
                color:white;
                border:0;
                border-radius:5px;
                cursor:pointer;
              "
            >
              Annuler
            </button>

            <button
              id="ctS"
              style="
                padding:10px;
                background:#ff5722;
                color:white;
                border:0;
                border-radius:5px;
                cursor:pointer;
              "
            >
              Envoyer
            </button>
          </div>
        </div>
      `;

      document.body.append(button, overlay);


      // ========================================
      // 6. BOUTON DE CONTACT DÉPLAÇABLE
      // ========================================

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
        } catch (error) {
          // Le bouton reste utilisable
          // même si le stockage est bloqué.
        }
      }

      // Restaurer sa dernière position.

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
      } catch (error) {
        // Aucune position enregistrée.
      }

      let drag = null;
      let ignoreClick = false;

      function beginDrag(x, y, type) {

        const rect =
          button.getBoundingClientRect();

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


      // ========================================
      // 7. GESTION TACTILE SMARTPHONE
      // ========================================

      let activeTouchId = null;

      button.addEventListener(
        "touchstart",
        event => {

          if (
            drag ||
            event.touches.length !== 1
          ) {
            return;
          }

          const touch =
            event.changedTouches[0];

          activeTouchId = touch.identifier;

          beginDrag(
            touch.clientX,
            touch.clientY,
            "touch"
          );

          button.style.cursor = "grabbing";

        },
        { passive: true }
      );

      button.addEventListener(
        "touchmove",
        event => {

          if (
            !drag ||
            drag.type !== "touch"
          ) {
            return;
          }

          const touch =
            Array.from(event.changedTouches)
              .find(item =>
                item.identifier === activeTouchId
              );

          if (!touch) return;

          updateDrag(
            touch.clientX,
            touch.clientY
          );

          if (
            drag.moved &&
            event.cancelable
          ) {
            event.preventDefault();
          }

        },
        { passive: false }
      );

      button.addEventListener(
        "touchend",
        event => {

          if (
            !drag ||
            drag.type !== "touch"
          ) {
            return;
          }

          const touch =
            Array.from(event.changedTouches)
              .find(item =>
                item.identifier === activeTouchId
              );

          if (!touch) return;

          const moved = drag.moved;

          endDrag();
          activeTouchId = null;

          if (!moved) {
            overlay.style.display = "block";
            ignoreClick = true;
          }

          if (event.cancelable) {
            event.preventDefault();
          }

        },
        { passive: false }
      );

      button.addEventListener(
        "touchcancel",
        () => {

          if (
            drag &&
            drag.type === "touch"
          ) {
            endDrag();
          }

          activeTouchId = null;
        }
      );


      // ========================================
      // 8. GESTION SOURIS ORDINATEUR
      // ========================================

      button.addEventListener(
        "mousedown",
        event => {

          if (event.button !== 0) return;

          beginDrag(
            event.clientX,
            event.clientY,
            "mouse"
          );

          button.style.cursor = "grabbing";

          event.preventDefault();
        }
      );

      document.addEventListener(
        "mousemove",
        event => {

          if (
            !drag ||
            drag.type !== "mouse"
          ) {
            return;
          }

          updateDrag(
            event.clientX,
            event.clientY
          );
        }
      );

      document.addEventListener(
        "mouseup",
        () => {

          if (
            drag &&
            drag.type === "mouse"
          ) {
            endDrag();
          }
        }
      );

      button.addEventListener(
        "click",
        event => {

          if (ignoreClick) {
            ignoreClick = false;
            event.preventDefault();
            return;
          }

          if (!drag) {
            overlay.style.display = "block";
          }
        }
      );

      window.addEventListener(
        "resize",
        () => {

          if (button.style.left) {

            const rect =
              button.getBoundingClientRect();

            moveButton(
              rect.left,
              rect.top
            );

            savePosition();
          }
        }
      );


      // ========================================
      // 9. ENVOI DU MESSAGE EMAILJS
      // ========================================

      overlay.addEventListener(
        "click",
        event => {

          if (
            event.target === overlay ||
            event.target.id === "ctC"
          ) {
            overlay.style.display = "none";
            return;
          }

          if (event.target.id === "ctS") {

            const data =
              Object.fromEntries(
                fields.map(field => [
                  field,
                  document.getElementById(
                    "ct_" + field
                  ).value
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
              overlay.style.display = "none";
            })
            .catch(() => {
              alert("❌ Erreur lors de l'envoi");
            });
          }
        }
      );
    };

    document.head.appendChild(emailScript);
  };


  // ==========================================
  // 10. DÉMARRAGE DU SCRIPT
  // ==========================================

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      start
    );

  } else {

    start();

  }

})();


/* ============================================
   FLANDRES — BOUTON FLOTTANT INSTALLER
   VERSION DEPLACABLE + SAJAB
   ============================================ */

(function () {
  "use strict";

  const INSTALL_URL =
    "https://flandrescavederecoltants-prog.github.io/PopUp-Hiboutik/boutique.html?reinstaller=1";

  const BOUTON_ID = "flandres-install-float";
  const CLE_POSITION = "flandresInstallBoutonPositionV1";
  const MARGE = 8;
  const SEUIL_GLISSEMENT = 7;

  function ajouterBoutonInstallation() {
    if (document.getElementById(BOUTON_ID)) return;

    const bouton = document.createElement("a");

    bouton.id = BOUTON_ID;
    bouton.href = INSTALL_URL;
    bouton.target = "_blank";
    bouton.rel = "noopener noreferrer";
    bouton.textContent = "📲 Installer";

    bouton.setAttribute(
      "aria-label",
      "Installer ou réinstaller le raccourci Flandres"
    );

    bouton.title = "Installer la boutique sur mon téléphone";

    Object.assign(bouton.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      right: "auto",
      bottom: "auto",
      zIndex: "2147483646",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 13px",
      borderRadius: "24px",
      background: "#29221D",
      color: "#D9A36C",
      border: "1px solid #D9A36C",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      textDecoration: "none",
      boxShadow: "0 3px 12px rgba(0,0,0,0.22)",
      cursor: "grab",
      whiteSpace: "nowrap",
      userSelect: "none",
      WebkitUserSelect: "none",
      touchAction: "none",
      WebkitTapHighlightColor: "transparent"
    });

    document.body.appendChild(bouton);

    let x = 0;
    let y = 0;
    let positionInitialisee = false;

    function limiter(valeur, minimum, maximum) {
      return Math.max(minimum, Math.min(valeur, maximum));
    }

    // SAJAB : garde toujours le bouton dans l'écran.
    function securiserPosition(nouveauX, nouveauY) {
      const largeur = bouton.offsetWidth;
      const hauteur = bouton.offsetHeight;

      const maximumX = Math.max(
        MARGE,
        window.innerWidth - largeur - MARGE
      );

      const maximumY = Math.max(
        MARGE,
        window.innerHeight - hauteur - MARGE
      );

      x = limiter(nouveauX, MARGE, maximumX);
      y = limiter(nouveauY, MARGE, maximumY);

      bouton.style.left = x + "px";
      bouton.style.top = y + "px";
    }

    function memoriserPosition() {
      try {
        localStorage.setItem(
          CLE_POSITION,
          JSON.stringify({
            x: x,
            y: y
          })
        );
      } catch (erreur) {
        // Le bouton reste utilisable sans stockage.
      }
    }

    function restaurerPosition() {
      let position = null;

      try {
        const valeur = localStorage.getItem(CLE_POSITION);

        if (valeur) {
          position = JSON.parse(valeur);
        }
      } catch (erreur) {
        position = null;
      }

      if (
        position &&
        Number.isFinite(position.x) &&
        Number.isFinite(position.y)
      ) {
        securiserPosition(position.x, position.y);
      } else {
        // Position initiale : bas à droite.
        securiserPosition(
          window.innerWidth - bouton.offsetWidth - 12,
          window.innerHeight - bouton.offsetHeight - 90
        );
      }

      positionInitialisee = true;
    }

    restaurerPosition();

    let glissement = null;
    let bloquerProchainClic = false;

    bouton.addEventListener("pointerdown", function (evenement) {
      if (evenement.button !== 0) return;

      glissement = {
        id: evenement.pointerId,
        departX: evenement.clientX,
        departY: evenement.clientY,
        positionX: x,
        positionY: y,
        deplace: false
      };

      bouton.style.cursor = "grabbing";

      try {
        bouton.setPointerCapture(evenement.pointerId);
      } catch (erreur) {
        // Certains navigateurs peuvent refuser la capture.
      }
    });

    bouton.addEventListener("pointermove", function (evenement) {
      if (
        !glissement ||
        evenement.pointerId !== glissement.id
      ) {
        return;
      }

      const differenceX =
        evenement.clientX - glissement.departX;

      const differenceY =
        evenement.clientY - glissement.departY;

      const distance = Math.hypot(
        differenceX,
        differenceY
      );

      if (
        !glissement.deplace &&
        distance < SEUIL_GLISSEMENT
      ) {
        return;
      }

      glissement.deplace = true;

      securiserPosition(
        glissement.positionX + differenceX,
        glissement.positionY + differenceY
      );
    });

    function terminerGlissement(evenement) {
      if (
        !glissement ||
        evenement.pointerId !== glissement.id
      ) {
        return;
      }

      if (glissement.deplace) {
        bloquerProchainClic = true;
        memoriserPosition();
      }

      glissement = null;
      bouton.style.cursor = "grab";
    }

    bouton.addEventListener(
      "pointerup",
      terminerGlissement
    );

    bouton.addEventListener(
      "pointercancel",
      terminerGlissement
    );

    // Un glissement ne doit pas ouvrir la page.
    bouton.addEventListener("click", function (evenement) {
      if (bloquerProchainClic) {
        evenement.preventDefault();
        bloquerProchainClic = false;
      }
    });

    // SAJAB : protection lors d'une rotation du téléphone.
    window.addEventListener("resize", function () {
      if (!positionInitialisee) return;

      securiserPosition(x, y);
      memoriserPosition();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      ajouterBoutonInstallation,
      { once: true }
    );
  } else {
    ajouterBoutonInstallation();
  }
})();
// Relance publication GitHub Pages - SAJAB
