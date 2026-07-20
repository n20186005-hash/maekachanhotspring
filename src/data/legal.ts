export const legalData: Record<string, any> = {
  zh: {
    privacy: {
      title: "隐私政策",
      lastUpdated: "最后更新时间：2026年7月",
      sections: [
        {
          title: "我们收集的信息",
          content: "我们仅收集提供服务所必需的最低限度数据。这些数据可能包括：",
          list: [
            "浏览数据（IP 地址、浏览器类型、访问页面）",
            "Cookie 和类似技术",
            "您通过联系表格或电子邮件自愿提供的任何信息"
          ]
        },
        {
          title: "我们如何使用您的信息",
          content: "我们使用收集到的信息用于：",
          list: [
            "改善网站内容和用户体验",
            "分析流量和使用模式",
            "回应请求",
            "遵守我们的法律义务"
          ]
        },
        {
          title: "第三方服务",
          content: "我们的网站可能会使用第三方服务，例如谷歌地图（用于嵌入式地图和位置数据）、谷歌分析（用于流量分析）和 Unsplash（用于图片）。这些服务均有各自的隐私政策。"
        },
        {
          title: "您的权利",
          content: "根据《通用数据保护条例》(GDPR)及相关法规，您享有以下权利：",
          list: [
            "访问您的个人数据",
            "要求更正或删除",
            "反对处理",
            "向监管机构提出投诉"
          ]
        }
      ]
    },
    terms: {
      title: "服务条款",
      lastUpdated: "最后更新时间：2026年7月",
      intro: "访问和使用本网站，即表示您同意受这些服务条款的约束。",
      sections: [
        {
          title: "内容使用",
          content: "本网站所有内容仅供参考。我们是一家独立的第三方旅游信息网站，与任何旅游景点、政府机构或商业运营商均无关联。"
        },
        {
          title: "信息的准确性",
          content: "我们力求提供准确及时的信息，但无法保证信息的完整性或准确性。行程安排、条件和服务如有变更，恕不另行通知。请务必在出行前通过官方渠道核实重要信息。"
        },
        {
          title: "知识产权",
          content: "本网站设计和原创内容受版权保护。图片来自独立创作者或许可图库。Google 地图数据的使用符合 Google 的服务条款。"
        },
        {
          title: "责任限制",
          content: "本网站按“现状”提供，不作任何担保。对于因使用本网站信息而造成的任何损失，包括但不限于基于本网站内容做出的旅行决定，我们概不负责。"
        }
      ]
    },
    cookies: {
      title: "Cookie 设置",
      lastUpdated: "最后更新时间：2026年7月",
      intro: "我们使用 Cookie 来改善您的浏览体验。您可以在下方管理您的偏好设置。",
      categories: [
        {
          id: "essential",
          title: "必要 Cookie",
          desc: "这些 Cookie 对于网站正常运行至关重要，无法禁用。",
          items: [
            { name: "必要 Cookie", status: "始终保持活跃", active: true, locked: true }
          ]
        },
        {
          id: "analytics",
          title: "分析型 Cookie",
          desc: "它们通过收集匿名使用数据，帮助我们了解访客如何与我们的网站互动。",
          items: [
            { name: "Google Analytics", desc: "它会收集访客如何使用我们网站的匿名信息。", status: "激活", active: true, locked: false }
          ]
        },
        {
          id: "preferences",
          title: "偏好 Cookie",
          desc: "它们会记住您的设置，例如语言和主题偏好。",
          items: [
            { name: "用户偏好", desc: "保存您的语言偏好和网站设置。", status: "激活", active: true, locked: false }
          ]
        },
        {
          id: "marketing",
          title: "营销 Cookie",
          desc: "它们用于展示相关广告并衡量广告活动的有效性。",
          items: [
            { name: "个性化广告", desc: "它可以根据你的兴趣为你展示相关的广告。", status: "停用", active: false, locked: false }
          ]
        }
      ],
      actions: {
        save: "保存偏好设置",
        rejectAll: "拒绝一切"
      },
      note: "您可以随时更改您的 Cookie 设置。请注意，禁用某些 Cookie 可能会影响网站的功能。"
    }
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: July 2026",
      sections: [
        {
          title: "Information We Collect",
          content: "We collect only the minimum data necessary to provide our services. This may include:",
          list: [
            "Browsing data (IP address, browser type, visited pages)",
            "Cookies and similar technologies",
            "Information you voluntarily provide via contact forms or email"
          ]
        },
        {
          title: "How We Use Your Information",
          content: "We use the collected information to:",
          list: [
            "Improve website content and user experience",
            "Analyze traffic and usage patterns",
            "Respond to requests",
            "Comply with legal obligations"
          ]
        },
        {
          title: "Third-Party Services",
          content: "Our website may use third-party services such as Google Maps (for embedded maps) and Google Analytics (for traffic analysis). These services have their own privacy policies."
        },
        {
          title: "Your Rights",
          content: "Under the GDPR and relevant regulations, you have the right to:",
          list: [
            "Access your personal data",
            "Request correction or deletion",
            "Object to processing",
            "Lodge a complaint with a supervisory authority"
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: July 2026",
      intro: "By accessing and using this website, you agree to be bound by these Terms of Service.",
      sections: [
        {
          title: "Use of Content",
          content: "All content on this website is for informational purposes only. We are an independent third-party travel information site, unaffiliated with any tourist attraction, government agency, or commercial operator."
        },
        {
          title: "Accuracy of Information",
          content: "We strive to provide accurate and timely information, but cannot guarantee its completeness or accuracy. Schedules, conditions, and services are subject to change without notice. Please verify important information through official channels before traveling."
        },
        {
          title: "Intellectual Property",
          content: "The design and original content of this website are protected by copyright. Google Maps data is used in accordance with Google's Terms of Service."
        },
        {
          title: "Limitation of Liability",
          content: "This website is provided 'as is' without any warranties. We are not liable for any losses resulting from the use of information on this site, including travel decisions based on our content."
        }
      ]
    },
    cookies: {
      title: "Cookie Settings",
      lastUpdated: "Last Updated: July 2026",
      intro: "We use cookies to improve your browsing experience. You can manage your preferences below.",
      categories: [
        {
          id: "essential",
          title: "Essential Cookies",
          desc: "These cookies are strictly necessary for the website to function properly and cannot be disabled.",
          items: [
            { name: "Essential Cookies", status: "Always Active", active: true, locked: true }
          ]
        },
        {
          id: "analytics",
          title: "Analytics Cookies",
          desc: "They help us understand how visitors interact with our website by collecting anonymous usage data.",
          items: [
            { name: "Google Analytics", desc: "Collects anonymous information on how visitors use our site.", status: "Active", active: true, locked: false }
          ]
        },
        {
          id: "preferences",
          title: "Preference Cookies",
          desc: "They remember your settings, such as language and theme preferences.",
          items: [
            { name: "User Preferences", desc: "Saves your language preferences and site settings.", status: "Active", active: true, locked: false }
          ]
        },
        {
          id: "marketing",
          title: "Marketing Cookies",
          desc: "Used to deliver relevant advertisements and measure campaign effectiveness.",
          items: [
            { name: "Personalized Ads", desc: "Displays relevant ads based on your interests.", status: "Inactive", active: false, locked: false }
          ]
        }
      ],
      actions: {
        save: "Save Preferences",
        rejectAll: "Reject All"
      },
      note: "You can change your cookie settings at any time. Note that disabling certain cookies may affect website functionality."
    }
  },
  th: {
    privacy: {
      title: "นโยบายความเป็นส่วนตัว",
      lastUpdated: "อัปเดตล่าสุด: กรกฎาคม 2026",
      sections: [
        {
          title: "ข้อมูลที่เรารวบรวม",
          content: "เรารวบรวมเฉพาะข้อมูลขั้นต่ำที่จำเป็นในการให้บริการ ซึ่งอาจรวมถึง:",
          list: [
            "ข้อมูลการท่องเว็บ (ที่อยู่ IP, ประเภทเบราว์เซอร์, หน้าที่เข้าชม)",
            "คุกกี้และเทคโนโลยีที่คล้ายคลึงกัน",
            "ข้อมูลใดๆ ที่คุณให้ไว้โดยสมัครใจผ่านแบบฟอร์มการติดต่อหรืออีเมล"
          ]
        },
        {
          title: "เราใช้ข้อมูลของคุณอย่างไร",
          content: "เราใช้ข้อมูลที่รวบรวมเพื่อ:",
          list: [
            "ปรับปรุงเนื้อหาเว็บไซต์และประสบการณ์ผู้ใช้",
            "วิเคราะห์ปริมาณการเข้าชมและรูปแบบการใช้งาน",
            "ตอบสนองต่อคำขอ",
            "ปฏิบัติตามภาระผูกพันทางกฎหมายของเรา"
          ]
        },
        {
          title: "บริการของบุคคลที่สาม",
          content: "เว็บไซต์ของเราอาจใช้บริการของบุคคลที่สาม เช่น Google Maps (สำหรับแผนที่ที่ฝังตัว) และ Google Analytics (สำหรับการวิเคราะห์ปริมาณการเข้าชม) บริการเหล่านี้มีนโยบายความเป็นส่วนตัวของตนเอง"
        },
        {
          title: "สิทธิ์ของคุณ",
          content: "ภายใต้ GDPR และกฎระเบียบที่เกี่ยวข้อง คุณมีสิทธิ์ที่จะ:",
          list: [
            "เข้าถึงข้อมูลส่วนบุคคลของคุณ",
            "ขอให้แก้ไขหรือลบ",
            "คัดค้านการประมวลผล",
            "ยื่นข้อร้องเรียนต่อหน่วยงานกำกับดูแล"
          ]
        }
      ]
    },
    terms: {
      title: "ข้อกำหนดการให้บริการ",
      lastUpdated: "อัปเดตล่าสุด: กรกฎาคม 2026",
      intro: "การเข้าถึงและใช้งานเว็บไซต์นี้ แสดงว่าคุณตกลงที่จะผูกพันตามข้อกำหนดการให้บริการเหล่านี้",
      sections: [
        {
          title: "การใช้เนื้อหา",
          content: "เนื้อหาทั้งหมดในเว็บไซต์นี้มีไว้เพื่อเป็นข้อมูลอ้างอิงเท่านั้น เราเป็นเว็บไซต์ข้อมูลการท่องเที่ยวของบุคคลที่สามที่เป็นอิสระ ไม่มีความเกี่ยวข้องกับสถานที่ท่องเที่ยว หน่วยงานของรัฐ หรือผู้ประกอบการเชิงพาณิชย์ใดๆ"
        },
        {
          title: "ความถูกต้องของข้อมูล",
          content: "เรามุ่งมั่นที่จะให้ข้อมูลที่ถูกต้องและทันเวลา แต่ไม่สามารถรับประกันความสมบูรณ์หรือความถูกต้องได้ ตารางเวลา เงื่อนไข และบริการอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า โปรดตรวจสอบข้อมูลสำคัญผ่านช่องทางอย่างเป็นทางการก่อนเดินทาง"
        },
        {
          title: "ทรัพย์สินทางปัญญา",
          content: "การออกแบบและเนื้อหาต้นฉบับของเว็บไซต์นี้ได้รับการคุ้มครองตามกฎหมายลิขสิทธิ์ การใช้ข้อมูล Google Maps เป็นไปตามข้อกำหนดการให้บริการของ Google"
        },
        {
          title: "ข้อจำกัดความรับผิด",
          content: "เว็บไซต์นี้ให้บริการ 'ตามสภาพ' โดยไม่มีการรับประกันใดๆ เราไม่รับผิดชอบต่อความสูญเสียใดๆ ที่เกิดจากการใช้ข้อมูลบนเว็บไซต์นี้ รวมถึงการตัดสินใจเดินทางตามเนื้อหาของเรา"
        }
      ]
    },
    cookies: {
      title: "การตั้งค่าคุกกี้",
      lastUpdated: "อัปเดตล่าสุด: กรกฎาคม 2026",
      intro: "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การท่องเว็บของคุณ คุณสามารถจัดการการตั้งค่าของคุณได้ด้านล่าง",
      categories: [
        {
          id: "essential",
          title: "คุกกี้ที่จำเป็น",
          desc: "คุกกี้เหล่านี้มีความสำคัญต่อการทำงานที่เหมาะสมของเว็บไซต์และไม่สามารถปิดการใช้งานได้",
          items: [
            { name: "คุกกี้ที่จำเป็น", status: "ใช้งานเสมอ", active: true, locked: true }
          ]
        },
        {
          id: "analytics",
          title: "คุกกี้เพื่อการวิเคราะห์",
          desc: "ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมโต้ตอบกับเว็บไซต์ของเราอย่างไรโดยการรวบรวมข้อมูลการใช้งานที่ไม่ระบุตัวตน",
          items: [
            { name: "Google Analytics", desc: "รวบรวมข้อมูลที่ไม่ระบุตัวตนเกี่ยวกับวิธีที่ผู้เยี่ยมชมใช้งานเว็บไซต์ของเรา", status: "ใช้งาน", active: true, locked: false }
          ]
        },
        {
          id: "preferences",
          title: "คุกกี้การตั้งค่า",
          desc: "จดจำการตั้งค่าของคุณ เช่น ภาษาและธีม",
          items: [
            { name: "การตั้งค่าผู้ใช้", desc: "บันทึกการตั้งค่าภาษาและเว็บไซต์ของคุณ", status: "ใช้งาน", active: true, locked: false }
          ]
        },
        {
          id: "marketing",
          title: "คุกกี้เพื่อการตลาด",
          desc: "ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องและวัดประสิทธิภาพของแคมเปญ",
          items: [
            { name: "โฆษณาที่ปรับให้เหมาะกับบุคคล", desc: "แสดงโฆษณาที่เกี่ยวข้องตามความสนใจของคุณ", status: "ไม่ใช้งาน", active: false, locked: false }
          ]
        }
      ],
      actions: {
        save: "บันทึกการตั้งค่า",
        rejectAll: "ปฏิเสธทั้งหมด"
      },
      note: "คุณสามารถเปลี่ยนการตั้งค่าคุกกี้ของคุณได้ตลอดเวลา โปรดทราบว่าการปิดใช้งานคุกกี้บางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์"
    }
  }
};
