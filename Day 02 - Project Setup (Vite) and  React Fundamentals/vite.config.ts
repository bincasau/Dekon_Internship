import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";

// defineConfig cung cấp gợi ý kiểu (IntelliSense) cho toàn bộ cấu hình Vite.
// Hàm callback cho phép cấu hình thay đổi theo command (serve/build) và mode.
export default defineConfig(({ command, mode, isSsrBuild }) => {
  // 14. ENVIRONMENT VARIABLES
  // loadEnv đọc .env, .env.local, .env.[mode] và .env.[mode].local.
  // Tham số "" cuối cùng cho phép đọc mọi biến trong file config.
  // Ở code frontend chỉ các biến có tiền tố VITE_ mới được công khai.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // 1. CẤU HÌNH CHUNG
    // root: thư mục gốc chứa index.html. base: URL gốc khi deploy.
    // root: Xác định thư mục gốc của project, nơi Vite tìm file index.html.
    // "." nghĩa là thư mục hiện tại, tức thư mục đang chứa vite.config.ts.
    root: ".",

    // base: Đường dẫn gốc được thêm vào trước URL của JS, CSS và assets khi build.
    // Ví dụ deploy tại https://example.com/my-app/ thì đặt VITE_BASE_URL=/my-app/.
    // Nếu không khai báo biến môi trường, ứng dụng mặc định chạy tại đường dẫn "/".
    base: env.VITE_BASE_URL || "/",

    // publicDir: Thư mục chứa tài nguyên tĩnh không cần Vite xử lý.
    // File public/favicon.svg được truy cập bằng /favicon.svg và được copy nguyên vào dist.
    publicDir: "public",

    // mode: Chế độ hiện tại, thường là "development" hoặc "production".
    // Mode quyết định Vite sẽ đọc thêm file .env.development hay .env.production.
    mode,

    // plugins: Danh sách plugin mở rộng khả năng của Vite.
    // react() giúp Vite biên dịch JSX/TSX và hỗ trợ React Fast Refresh.
    plugins: [react()],

    // clearScreen: Có xóa nội dung terminal cũ mỗi khi Vite cập nhật hay không.
    // false giữ lại log cũ để dễ xem và đối chiếu lỗi trong lúc học/debug.
    clearScreen: true,

    // appType: Kiểu ứng dụng mà Vite đang phục vụ.
    // "spa" sẽ fallback về index.html khi truy cập route phía client như /products/1.
    appType: "spa",

    // Giá trị define được thay thế trực tiếp lúc build.
    // JSON.stringify giúp kết quả được chèn vào là một chuỗi JavaScript hợp lệ.
    define: {
      // Lấy version từ package.json; trong source có thể dùng biến __APP_VERSION__.
      __APP_VERSION__: JSON.stringify(
        process.env.npm_package_version ?? "0.0.0",
      ),
      // true khi chạy vite dev, false khi chạy vite build.
      __DEV_COMMAND__: JSON.stringify(command === "serve"),
    },

    // 2. ALIAS
    // Cho phép import "@/App" thay vì đường dẫn tương đối như "../../App".
    // fileURLToPath hoạt động ổn định trên cả Windows, macOS và Linux.
    resolve: {
      alias: {
        // Ký hiệu @ trỏ đến src. Ví dụ: import App from "@/App".
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // Alias riêng cho hình ảnh: import logo from "@assets/logo.png".
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      // Các phần mở rộng Vite tự thử khi import không ghi đuôi file.
      // Ví dụ import "@/App" có thể tìm được App.tsx.
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },

    // 3. DEV SERVER
    // Chỉ dùng khi chạy npm run dev, không ảnh hưởng bản production build.
    server: {
      // 0.0.0.0 lắng nghe trên mọi card mạng, cho phép điện thoại cùng Wi-Fi truy cập.
      host: "0.0.0.0",
      // Ép chuỗi trong .env thành number; nếu không có thì dùng port 3000.
      port: Number(env.VITE_DEV_PORT) || 3000,
      // true: báo lỗi nếu port bận. false: Vite tự tìm port tiếp theo.
      strictPort: true,
      // Tự mở trang ứng dụng bằng trình duyệt mặc định khi dev server khởi động.
      open: true,
      // Cho phép request từ origin khác gọi đến dev server.
      // Production nên cấu hình CORS tại web server/backend thực tế.
      cors: true,

      // 4. PROXY API
      // Request /api/users sẽ được chuyển đến backend và thành /users.
      // Proxy giúp tránh lỗi CORS trong môi trường development.
      proxy: {
        "/api": {
          // Địa chỉ backend nhận request được proxy; mặc định là localhost:8080.
          target: env.VITE_API_PROXY_TARGET || "http://localhost:8080",
          // Đổi HTTP Host header thành host của target để backend chấp nhận request.
          changeOrigin: true,
          // false cho phép HTTPS backend dùng chứng chỉ tự ký; chỉ phù hợp môi trường dev.
          secure: false,
          // Bỏ tiền tố /api: /api/users được backend nhận thành /users.
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },

      // 5. HMR (HOT MODULE REPLACEMENT)
      // Cập nhật module trên trình duyệt mà không reload toàn bộ trang.
      hmr: {
        // ws là WebSocket thường; dùng wss nếu trang dev chạy qua HTTPS.
        protocol: "ws",
        // Host mà trình duyệt kết nối để nhận thông báo cập nhật module.
        host: env.VITE_HMR_HOST || "localhost",
        // Port WebSocket HMR; cần mở port này nếu chạy trong Docker/máy ảo.
        port: Number(env.VITE_HMR_PORT) || 3000,
        // Hiện bảng lỗi compile phủ trên giao diện trình duyệt.
        overlay: true,
      },

      // 6. FILE SYSTEM
      // strict ngăn dev server phục vụ file tùy ý bên ngoài workspace.
      fs: {
        // Chặn truy cập file nằm ngoài danh sách allow.
        strict: true,
        // Cho phép phục vụ file thuộc workspace hiện tại, hữu ích trong monorepo.
        allow: [searchForWorkspaceRoot(process.cwd())],
        // Luôn chặn file bí mật, chứng chỉ và dữ liệu Git dù nằm trong allow.
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
      },
    },

    // 7. PREVIEW
    // Cấu hình server dùng bởi npm run preview để xem thử thư mục dist.
    // Preview chỉ để kiểm tra local, không phải production server thực tế.
    preview: {
      // Cho thiết bị khác trong mạng xem bản build preview.
      host: "0.0.0.0",
      // Port của preview server, tách biệt với port dev 3000.
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
      // Báo lỗi thay vì tự đổi port khi 4173 đang được sử dụng.
      strictPort: true,
      // Tự mở trình duyệt sau khi preview server chạy.
      open: true,
      // Cho phép origin khác request tài nguyên từ preview server.
      cors: true,
    },

    // 8. BUILD
    build: {
      // Thư mục nhận kết quả sau khi chạy npm run build.
      outDir: "dist",
      // Thư mục con trong dist dùng chứa JS, CSS, hình ảnh và font.
      assetsDir: "assets",
      // Xóa nội dung dist cũ trước mỗi lần build để không còn file rác.
      emptyOutDir: true,
      // Tạo file .map để ánh xạ code đã build về source, giúp debug production.
      sourcemap: true,
      // Vite 8 dùng Oxc để minify mặc định, nhanh và không cần cài esbuild.
      minify: "oxc",
      // true tách CSS theo từng chunk; false gộp toàn bộ CSS thành một file.
      cssCodeSplit: true,
      // File asset nhỏ hơn 4 KiB được inline thành base64 để giảm request HTTP.
      assetsInlineLimit: 4096,
      // Tính và in kích thước gzip trong kết quả build; tắt để build nhanh hơn chút.
      reportCompressedSize: true,
      // Cảnh báo nếu một JavaScript chunk sau minify lớn hơn 600 KiB.
      chunkSizeWarningLimit: 600,

      // 9. TARGET BROWSER
      // es2020 là mức JavaScript đầu ra; browser quá cũ cần plugin legacy.
      target: "es2020",
      // Mức tương thích riêng của CSS, Vite sẽ hạ cú pháp CSS cho Chrome 80.
      cssTarget: "chrome80",

      // 10. TÊN FILE BUILD
      // [name] là tên module, [hash] đổi khi nội dung đổi để cache busting.
      rollupOptions: {
        output: {
          // File entry chính, ví dụ index-Ab12Cd.js.
          entryFileNames: "assets/js/[name]-[hash].js",
          // File chunk sinh ra từ dynamic import hoặc code splitting.
          chunkFileNames: "assets/js/[name]-[hash].js",
          // Hàm chọn thư mục output cho CSS, ảnh, font và tài nguyên khác.
          assetFileNames: (assetInfo) => {
            // Lấy tên asset đầu tiên; dùng "asset" nếu asset không có tên.
            const name = assetInfo.names?.[0] ?? "asset";
            // [extname] giữ nguyên phần mở rộng như .css, .png, .woff2.
            if (/\.css$/i.test(name))
              return "assets/css/[name]-[hash][extname]";
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            // Những loại file chưa khớp quy tắc trên được đặt trong media.
            return "assets/media/[name]-[hash][extname]";
          },
        },
      },
    },

    // 11. CSS
    css: {
      modules: {
        // class .button trong *.module.css sẽ có tên duy nhất khi build.
        generateScopedName:
          mode === "development"
            ? // Development giữ tên file/class để dễ đọc trong DevTools.
              "[name]__[local]__[hash:base64:5]"
            : // Production chỉ giữ hash ngắn để giảm kích thước CSS.
              "[hash:base64:8]",
        // Chỉ export tên class dạng camelCase: .my-button được dùng là styles.myButton.
        localsConvention: "camelCaseOnly",
      },
      // Tạo source map cho CSS khi chạy dev để DevTools chỉ đúng file nguồn.
      devSourcemap: true,
      // Truyền option riêng cho các CSS preprocessor như SCSS, Less, Stylus.
      preprocessorOptions: {
        // Muốn dùng SCSS cần cài thêm: npm install -D sass
        scss: {
          // Tự chèn biến này vào đầu mọi file SCSS mà không cần import thủ công.
          additionalData: `$app-mode: "${mode}";`,
        },
      },
    },

    // 12. JSON
    // namedExports cho phép: import { name } from "./package.json".
    // stringify false biến JSON thành object thay vì JSON.parse ở runtime.
    json: {
      // Cho phép import từng field của JSON bằng named import.
      namedExports: true,
      // false: chuyển JSON thành object JS; true: giữ dạng chuỗi và parse lúc runtime.
      stringify: false,
    },

    // 13. ASSETS
    // Các đuôi bổ sung này được coi là static asset và trả về URL khi import.
    assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.md", "**/*.wasm"],

    // 14. ENVIRONMENT VARIABLES (phần public cho frontend)
    // Thư mục Vite tìm các file .env; "." là project root.
    envDir: ".",
    // Chỉ biến bắt đầu bằng VITE_ được đưa vào frontend qua import.meta.env.
    // Không đặt password, secret key hoặc private token trong biến VITE_.
    envPrefix: "VITE_",

    // 15. DEPENDENCY OPTIMIZATION
    // Vite pre-bundle dependency khi dev để khởi động và reload nhanh hơn.
    optimizeDeps: {
      // Các HTML entry Vite quét để tìm dependency cần pre-bundle.
      entries: ["index.html"],
      // Buộc các package này được pre-bundle, hữu ích khi Vite không tự phát hiện.
      include: ["react", "react-dom", "react/jsx-runtime"],
      // Package trong exclude sẽ không được Vite pre-bundle.
      exclude: [],
      // true buộc tối ưu lại dependency, bỏ qua cache trong node_modules/.vite.
      force: false,
    },

    // 16. WEB WORKER
    // format "es" cho phép worker dùng import/export chuẩn ES Module.
    // Ví dụ: new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }).
    worker: {
      // Bundle worker theo ES Module để được dùng import/export.
      format: "es",
      // Tùy chỉnh cách Rolldown build riêng các file worker.
      rollupOptions: {
        output: {
          // Tên file entry của worker sau build.
          entryFileNames: "assets/workers/[name]-[hash].js",
          // Tên các chunk phụ được worker import.
          chunkFileNames: "assets/workers/[name]-[hash].js",
        },
      },
    },

    // 17. SSR (SERVER-SIDE RENDERING)
    // Chỉ có tác dụng khi build bằng vite build --ssr <entry-server>.
    // noExternal bắt Vite bundle các package này vào bản SSR.
    ssr: {
      // Sinh bundle SSR chạy trong Node.js; lựa chọn khác thường gặp là webworker.
      target: "node",
      // Bundle React vào output SSR thay vì để Node tự tải từ node_modules.
      noExternal: ["react", "react-dom"],
      // Các package liệt kê ở đây được giữ thành import ngoài bundle SSR.
      external: [],
      resolve: {
        // Ưu tiên nhánh export "node" trong package.json của dependency.
        conditions: ["node"],
      },
    },

    // Khi build SSR, ghi đè base bằng VITE_SSR_BASE_URL; build client giữ base phía trên.
    // Cú pháp ... trải object có điều kiện vào object cấu hình chính.
    ...(isSsrBuild ? { base: env.VITE_SSR_BASE_URL || "/" } : {}),
  };
});
