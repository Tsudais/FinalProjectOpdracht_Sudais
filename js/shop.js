document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const cartItemsContainer = document.querySelector(".cart-items");
  const wishlistItemsContainer = document.querySelector(".wishlist-items");
  const cartTotal = document.getElementById("cart-total");
  const wishlistTotal = document.getElementById("wishlist-total");

  const cart = [];
  const wishlist = [];

  function renderShopItems() {
    productsContainer.innerHTML = "";

    shopItems.forEach((item) => {
      const article = document.createElement("article");
      article.classList.add("product");

      article.innerHTML = `
        <div class="product-image">
           <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="product-content">
          <h3 class="product-title">${item.name}</h3>

          <div class="product-footer">
            <span class="product-price">€${item.price.toFixed(2)}</span>

            <div class="product-actions">
              <button class="add-to-cart" data-id="${
                item.id
              }">Voeg toe aan winkelmand</button>
              <button class="add-to-wishlist" data-id="${
                item.id
              }" aria-label="Verlanglijst">♡</button>
            </div>
          </div>
        </div>
      `;

      productsContainer.appendChild(article);
    });
  }

  function addToCart(item) {
    cart.push(item);
    renderCart();
  }

  function removeFromCart(id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index > -1) {
      cart.splice(index, 1);
      renderCart();
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <p class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="item-image" />
          ${item.name} – €${item.price.toFixed(2)}
          <button class="remove-from-cart" data-id="${
            item.id
          }" aria-label="Verwijder ${item.name}">❌</button>
        </p>
      `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartTotal.parentElement.style.display = cart.length > 0 ? "block" : "none";
  }

  function addToWishlist(item) {
    const index = wishlist.findIndex((i) => i.id === item.id);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(item);
    }
    renderWishlist();
  }

  function removeFromWishlist(id) {
    const index = wishlist.findIndex((i) => i.id === id);
    if (index > -1) {
      wishlist.splice(index, 1);
      renderWishlist();
    }
  }

  function renderWishlist() {
    wishlistItemsContainer.innerHTML = "";
    let total = 0;

    wishlist.forEach((item) => {
      total += item.price;
      wishlistItemsContainer.innerHTML += `
        <p class="wishlist-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="item-image" />
          ${item.name} – €${item.price.toFixed(2)}
          <button class="remove-from-wishlist" data-id="${
            item.id
          }" aria-label="Verwijder ${item.name}">❌</button>
        </p>
      `;
    });

    wishlistTotal.textContent = total.toFixed(2);
    wishlistTotal.parentElement.style.display =
      wishlist.length > 0 ? "block" : "none";
  }

  productsContainer.addEventListener("click", (e) => {
    const productElement = e.target.closest("article.product");
    if (!productElement) return;

    const id = parseInt(productElement.querySelector("[data-id]").dataset.id);
    const item = shopItems.find((product) => product.id === id);
    if (!item) return;

    if (e.target.classList.contains("add-to-cart")) {
      addToCart(item);
    }

    if (e.target.classList.contains("add-to-wishlist")) {
      addToWishlist(item);
    }

    if (e.target.tagName === "IMG" && item.page) {
      window.location.href = item.page;
    }
  });

  cartItemsContainer.addEventListener("click", (e) => {
    const p = e.target.closest("p.cart-item");
    if (!p) return;

    const id = parseInt(p.dataset.id);
    if (e.target.classList.contains("remove-from-cart")) {
      removeFromCart(id);
      return;
    }

    const item = cart.find((i) => i.id === id);
    if (item) {
      alert(`
${item.name}
Beschrijving: ${item.description}
Materiaal: ${item.material}
Afmetingen: ${item.dimensions}
Prijs: €${item.price.toFixed(2)}
      `);
    }
  });

  wishlistItemsContainer.addEventListener("click", (e) => {
    const p = e.target.closest("p.wishlist-item");
    if (!p) return;

    const id = parseInt(p.dataset.id);
    if (e.target.classList.contains("remove-from-wishlist")) {
      removeFromWishlist(id);
      return;
    }

    const item = wishlist.find((i) => i.id === id);
    if (item) {
      alert(`
${item.name}
Beschrijving: ${item.description}
Materiaal: ${item.material}
Afmetingen: ${item.dimensions}
Prijs: €${item.price.toFixed(2)}
      `);
    }
  });

  renderShopItems();
  renderCart();
  renderWishlist();
});
