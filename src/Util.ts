export async function refreshToken(): Promise<string|null> { // returns new access token
    const refresh = localStorage.getItem('Refreshtoken');
    
    const res = await fetch('http://localhost:8080/user/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refresh
        })
    });

    if (res.ok) {
        const body = await res.json();
        return body.jwttoken;
    }
    return null;
}

export async function authFetch(url: string, info?: RequestInit): Promise<Response> {
    const access = localStorage.getItem('Accesstoken');

    if (!access) {
        // Access token is missing, redirect to login page
        window.location.href = '/login';
        throw new Error('Access token missing');
    }
    
    const res = await fetch(url, {
        ...info,
        headers: {
            ...info?.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    });

    if (res.status == 451) {
        // invalid access token
        // const access = await refreshToken();
        // if (!access){
        //     window.location.href = '/login';
        //     throw new Error('Refresh token invalid');
        // }
            
        
        localStorage.setItem('Accesstoken', access);
        return authFetch(url, info);
    }

    return res;
}