declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

declare module '*.jpg' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

// Define as propriedades esperadas pela tela, neste caso o token JWT
type ProfileProps = StaticScreenProps<{
    token: string;
}>;

// Define a interface para o payload do token JWT, contendo as propriedades esperadas
interface JwtPayload {
    aud: string,
    iss: string,
    iat: number,
    nbf: number,
    exp: number,
    acct: number,
    acr: string,
    aio: string,
    amr: Array<string>,
    app_displayname: string,
    appid: string,
    appidacr: string,
    family_name: string,
    given_name: string,
    idtyp: string,
    ipaddr: string,
    name: string,
    oid: string,
    platf: string,
    puid: string,
    rh: string,
    scp: string,
    sid: string,
    signin_state: Array<string>,
    sub: string,
    tenant_region_scope: string,
    tid: string,
    unique_name: string,
    upn: string,
    uti: string,
    ver: string,
    wids: Array<string>,
    xms_ftd: string,
    xms_idrel: string,
    xms_st: { sub: string },
    xms_tcdt: number
}
