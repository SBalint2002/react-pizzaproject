/**
 *Lekéri az új hozzáférési tokent a frissítő tokent használva, majd frissíti azt a localStorage-ban
 *@return {Promise<string|null>} - Egy Promise, amely az új hozzáférési tokennel vagy null értékkel feloldódik, ha az sikertelen
 */
export async function refreshToken(): Promise<string | null> { // Fetch kérés az '/auth/refresh' végpont felé POST metódussal JSON formátumban
    const refresh = localStorage.getItem('Refreshtoken');

    const res = await fetch('/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refresh
        })
    });

    if (res.ok) { // Ha a fetch kérés sikeres volt, akkor visszatérünk az új access tokennel
        const body = await res.json();
        return body.accessToken;
    }
    return null; // Ha a fetch kérés sikertelen volt, akkor visszatérünk null értékkel
}

/**
 *Az adott URL-hez és kérési beállításokhoz tartozó hitelesített fetch kérést hajt végre
 *@param {string} url - Az elérni kívánt URL
 *@param {RequestInit} [info] - Az opciók, amelyeket a fetch kérésben szeretnénk megadni (pl. fejlécek, metódus)
 *@return {Promise<Response>} - Egy Promise, amely a Response objektummal oldódik fel
 *@throws {Error} - Ha hiányzik az access token, vagy érvénytelen, vagy ha a refresh token érvénytelen
 */
export async function authFetch(url: string, info?: RequestInit): Promise<Response> {
    const access = localStorage.getItem('Accesstoken');

    if (!access) {
        throw new Error('Access token missing');
    }

    const res = await fetch(url, { // Fetch kérés a megadott url cím felé, amely tartalmazza az authentikációs adatokat
        ...info,
        headers: {
            ...info?.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    });

    if (res.status === 451) { // Ha a status érték 451 (invalid access token), akkor frissítjük az access tokent a refreshToken függvénnyel
        const access = await refreshToken();
        if (!access) {
            // Access token null
            throw new Error('Refresh token invalid');
        }


        localStorage.setItem('Accesstoken', access); // Az új access token értékét eltároljuk a local storage-ban
        return authFetch(url, info); // A függvény rekurzívan meghívja önmagát, hogy újra végrehajtsa a fetch kérést az új access tokennel
    }

    return res;
}