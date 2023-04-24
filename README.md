# PizzaVáltó projekt Weboldal
Ez az alkalmazás egy pizza rendelő alkalmazás, amely lehetővé teszi a felhasználók számára a pizza kiválasztását, hozzáadását a kosárhoz, rendelés feladását, az előző rendelések megtekintését és a felhasználói információk frissítését.
## Futtatás

A projekt React js használatával íródott, TypeScript nyelvben. A futtatáshoz szükséges:
- Backend: [PizzaProject Backend](https://github.com/SBalint2002/PizzaProject-spring)
- Fejleszői környezet: [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- Keretrendszer: [React](https://react.dev/)
- Adatbázis-kezelő: [MariaDB](https://mariadb.org/)


### Telepítés

Ha nincs telepítve az alkalmazás, akkor a következő lépéseket kell végrehajtani:

- Klónozza le a projektet a Gitből a következő paranccsal:
```bash
git clone https://github.com/SBalint2002/PizzaProject-React
```
- Futtassa a terminálban ```npm init``` parancsot
- Futtassa a terminálban ```npm start``` parancsot

### Teszt felhasználó
Az alábbi adatokkal lehet bejelentkezni a teszteléshez egy Adminisztrátor fiókkal:

Email: ```tesztelek@gmail.com```

Jelszó: ```Adminadmin1```

## Adatbázis
Az alkalmazás az adatokat egy [MariaDB](https://mariadb.org/) adatbázisban tárolja. Ha az adatbázis nem létezik, a backend alkalmazás automatikusan létrehozza és feltölti az alapértelmezett adatokkal.

## Funkciók
A felhasználó számára a következő funkciók érhetők el:

- Regisztrálhat és bejelentkezhet az alkalmazásba.
- Láthatja az étlapot (pizzákat) és hozzáadhatják a kiválasztott pizzákat a kosárhoz.
- A kosárba helyezett termékeket ellenőrizheti és megrendelheti azokat, megadva a szállítási címet és a telefonszámot.
- Az előző rendeléseket meg lehet tekinteni az alkalmazásban. A készen álló rendelések zöldek, az új rendelések szürkék.
- Frissítheti saját adatlapját.
