// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://1.1.1.1/generate_204",
  "max-failed-times": 3,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"] = "127.0.0.1:9090";
  config["external-ui"] = "ui";
  config["external-ui-url"] = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "default-nameserver": ["system"],
    "nameserver": ["223.5.5.5", "119.29.29.29", "180.184.1.1"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "Main Node",
      "type": "select",
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "Special",
      "type": "select",
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "Global Media",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Area.png"
    },
     {
      ...groupBaseOption,
      "name": "Bahamut",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/lige47/QuanX-icon-rule/main/icon/bahamute.png"
    },
    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "EmbyDirect",
      "type": "select",
      "proxies": ["DIRECT", "Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "全球直连",
      "type": "select",
      "proxies": ["DIRECT", "Main Node", "Special", "HK", "US", "SG", "JP", "TW"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "Final",
      "type": "select",
      "proxies": ["Main Node", "Special", "HK", "US", "SG", "JP", "TW","DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "HK",
      "type": "select",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇭🇰|HK|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "US",
      "type": "select",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇺🇸|US|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "SG",
      "type": "select",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇸🇬|SG|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "JP",
      "type": "select",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇯🇵|JP|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "TW",
      "type": "select",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|TW|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./rules/Google.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rules/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./rules/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Twitter.list",
      "path": "./rules/Twitter.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rules/AI.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/zhaolook/zzz/main/Emby.list",
      "path": "./Emby.list"
    },
    "EmbyDirect": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/zhaolook/zzz/main/EmbyDirect.list",
      "path": "./EmbyDirect.list"
    },
    "全球直连": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/zhaolook/zzz/main/Direct.list",
      "path": "./Direct.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rules/Spotify.list"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bahamut.list",
      "path": "./rules/Bahamut.list"
    },
    "Netflix": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Netflix.list",
      "path": "./rules/Netflix.list"
    },
    "Disney": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Disney.list",
      "path": "./rules/Disney.list"
    },
    "PrimeVideo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list",
      "path": "./rules/PrimeVideo.list"
    },
    "HBO": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/HBO.list",
      "path": "./rules/HBO.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rules/Lan.list"
    },
    "China": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./rules/China.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,AI,AI",
    "RULE-SET,YouTube,Google",
    "RULE-SET,Google,Google",
    "RULE-SET,Telegram,Telegram",
    "RULE-SET,Emby,Emby",
    "RULE-SET,EmbyDirect,EmbyDirect",
    "RULE-SET,全球直连,全球直连",
    "RULE-SET,Spotify,Global Media",
    "RULE-SET,Bahamut,Bahamut",
    "RULE-SET,Netflix,Global Media",
    "RULE-SET,Disney,Global Media",
    "RULE-SET,PrimeVideo,Global Media",
    "RULE-SET,HBO,Global Media",
    "RULE-SET,China,DIRECT",
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "DOMAIN-SUFFIX,aca.best,EmbyDirect",
    "DOMAIN-SUFFIX,misakaf.org,EmbyDirect",
    "DOMAIN-SUFFIX,jsq.mooguu.top,Emby",
    "DOMAIN-SUFFIX,sfcj.org,EmbyDirect",
    "DOMAIN-SUFFIX,embymv.link,EmbyDirect",
    "DOMAIN-SUFFIX,emby.yomo.lol,EmbyDirect",
    "DOMAIN-SUFFIX,alphatvapp.top,EmbyDirect",
    "DOMAIN-SUFFIX,apopcloud.live,EmbyDirect",
    "DOMAIN-SUFFIX,jmsuper.com,EmbyDirect",
    "DOMAIN-SUFFIX,285286.xyz,EmbyDirect",
    "DOMAIN-SUFFIX,boaz.cf,EmbyDirect",
    "DOMAIN-SUFFIX,1024.name,EmbyDirect",
    "DOMAIN-SUFFIX,pilipili.club,EmbyDirect",
    "DOMAIN-SUFFIX,fmta.boo,EmbyDirect",
    "DOMAIN-SUFFIX,acecandy.cn,EmbyDirect",
    "DOMAIN-SUFFIX,yhemby.top,EmbyDirect",
    "DOMAIN-SUFFIX,itsmyduty.top,EmbyDirect",
    "DOMAIN-SUFFIX,emby.my,EmbyDirect",
    "DOMAIN-SUFFIX,tnx.one,EmbyDirect",
    "DOMAIN-SUFFIX,nanflix.net,EmbyDirect",
    "DOMAIN-SUFFIX,awatv.de,Emby",
    "DOMAIN-SUFFIX,cn2gias.uk,Emby",
    "DOMAIN-SUFFIX,alist7.eu.org,Emby",
    "DOMAIN-SUFFIX,iflya321.com,Emby",
    "DOMAIN-SUFFIX,910427.xyz,EmbyDirect",
    "DOMAIN-SUFFIX,233988.xyz,EmbyDirect",
    "DOMAIN-SUFFIX,nanflix.net,EmbyDirect",
    "DOMAIN-SUFFIX,worldline.space,EmbyDirect",
    "DOMAIN-SUFFIX,emby.prpr.cn.com,EmbyDirect",
    "DOMAIN-SUFFIX,auroramedia.vip,EmbyDirect",
    "DOMAIN-SUFFIX,vfing.de,EmbyDirect",
    "DOMAIN-SUFFIX,sxiaolong-my.sharepoint.com,EmbyDirect",
    "DOMAIN-SUFFIX,nomaba.top,EmbyDirect",
    "DOMAIN-SUFFIX,7777777.buzz,EmbyDirect",
    "DOMAIN-SUFFIX,lemby.me,EmbyDirect",
    "DOMAIN-SUFFIX,doven.tv,EmbyDirect",
    "DOMAIN-SUFFIX,711.lol,EmbyDirect",
    "DOMAIN-SUFFIX,embylife.xyz,EmbyDirect",
    "DOMAIN-SUFFIX,favoritewife.com,EmbyDirect",
    "DOMAIN-SUFFIX,jingzhe.pro,EmbyDirect",
    "DOMAIN-SUFFIX,mobaiemby.site,EmbyDirect",
    "DOMAIN-SUFFIX,jsq.mooguu.xyz,EmbyDirect",
    "DOMAIN-SUFFIX,makima.online,Emby",
    "DOMAIN-SUFFIX,seamlessaccess.org,全球直连",
    "DOMAIN-SUFFIX,microsoft.com,全球直连",
    "IP-CIDR,132.226.20.31/24,EmbyDirect",
    "IP-CIDR,135.180.189.141/24,EmbyDirect",
    "IP-CIDR,129.154.193.8/24,EmbyDirect",
    "IP-CIDR,15.235.220.182/24,EmbyDirect",
    "IP-CIDR,193.122.114.13/24,EmbyDirect",
    "IP-CIDR,152.53.133.214/24,EmbyDirect",
    "IP-CIDR,129.154.57.174/24,EmbyDirect",
    "IP-CIDR,104.161.22.114/24,EmbyDirect",
    "IP-CIDR,192.210.216.166/24,EmbyDirect",
    "MATCH,Final"
  ];

  // 返回修改后的配置
  return config;
}
