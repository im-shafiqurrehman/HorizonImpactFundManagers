// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { fetchProducts } from "@/lib/productsSlice";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function ProductShowcase({
//   slice = false,
//   showSearchBar = false,
// }) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { products, loading, error } = useSelector((state) => state.products);

//   const [categories, setCategories] = useState([]);
//   const [selectedTab, setSelectedTab] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (products?.length > 0) {
//       const categorizedProducts = products.reduce((acc, product) => {
//         if (product.category) {
//           acc[product.category] = acc[product.category] || [];
//           acc[product.category].push(product);
//         }
//         return acc;
//       }, {});

//       const categoryArray = Object.entries(categorizedProducts).map(
//         ([key, value]) => ({
//           id: key,
//           name: key,
//           products: value,
//         })
//       );

//       setCategories(categoryArray);

//       // Automatically set "Distribution Boards" as the active tab if it exists
//       const defaultCategory = categoryArray.find(
//         (category) => category.name === "Distribution Boards"
//       );
//       setSelectedTab(defaultCategory?.id || categoryArray[0]?.id || "");
//     }
//   }, [products]);

//   useEffect(() => {
//     if (searchTerm) {
//       const lowercasedSearchTerm = searchTerm.toLowerCase();
//       const filtered = products.filter(
//         (product) =>
//           product.title.toLowerCase().includes(lowercasedSearchTerm) ||
//           product.description.toLowerCase().includes(lowercasedSearchTerm)
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [searchTerm, products]);

//   const handleTabClick = (categoryId) => setSelectedTab(categoryId);

//   const handleLearnMoreClick = (productId) =>
//     router.push(`/product-detail/${productId}`);

//   const handleSearchChange = (event) => setSearchTerm(event.target.value);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-16">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 py-16">
//         Failed to load products: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className="absolute -top-[450px] -left-[450px] w-full h-full -z-10 animated-bg"
//         style={{
//           width: "800px",
//           height: "800px",
//           backgroundSize: "cover",
//           backgroundPosition: "center center",
//           backgroundRepeat: "repeat",
//           backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22b%22%3E%3Cpath fill=%22currentColor%22 d=%22M851 703Q735 906 502 903T199 700q-70-200 36-337.5t294.5-189Q718 122 842.5 311t8.5 392Z%22%2F%3E%3C%2FclipPath%3E%3Cfilter id=%22a%22 x=%22-50vw%22 y=%22-50vh%22 width=%22100vw%22 height=%22100vh%22%3E%3CfeFlood flood-color=%22%23fff%22 result=%22neutral-gray%22%2F%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%22100%22 stitchTiles=%22stitch%22 result=%22noise%22%2F%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 result=%22destaturatedNoise%22%2F%3E%3CfeComponentTransfer in=%22desaturatedNoise%22 result=%22theNoise%22%3E%3CfeFuncA type=%22table%22 tableValues=%220 0 0.15 0%22%2F%3E%3C%2FfeComponentTransfer%3E%3CfeBlend in=%22SourceGraphic%22 in2=%22theNoise%22 mode=%22soft-light%22 result=%22noisy-image%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg filter=%22url(%23a)%22 clip-path=%22url(%23b)%22%3E%3Cpath fill=%22%23fdf3ec%22 d=%22M851 703Q735 906 502 903T199 700q-70-200 36-337.5t294.5-189Q718 122 842.5 311t8.5 392Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
//         }}
//       ></div>
//       <div
//         className="absolute -bottom-[350px] -right-[350px] w-full h-full -z-10 animated-bg"
//         style={{
//           width: "800px",
//           height: "800px",
//           backgroundSize: "cover",
//           backgroundPosition: "center center",
//           backgroundRepeat: "repeat",
//           backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22b%22%3E%3Cpath fill=%22currentColor%22 d=%22M851 703Q735 906 502 903T199 700q-70-200 36-337.5t294.5-189Q718 122 842.5 311t8.5 392Z%22%2F%3E%3C%2FclipPath%3E%3Cfilter id=%22a%22 x=%22-50vw%22 y=%22-50vh%22 width=%22100vw%22 height=%22100vh%22%3E%3CfeFlood flood-color=%22%23fff%22 result=%22neutral-gray%22%2F%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%22100%22 stitchTiles=%22stitch%22 result=%22noise%22%2F%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 result=%22destaturatedNoise%22%2F%3E%3CfeComponentTransfer in=%22desaturatedNoise%22 result=%22theNoise%22%3E%3CfeFuncA type=%22table%22 tableValues=%220 0 0.15 0%22%2F%3E%3C%2FfeComponentTransfer%3E%3CfeBlend in=%22SourceGraphic%22 in2=%22theNoise%22 mode=%22soft-light%22 result=%22noisy-image%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg filter=%22url(%23a)%22 clip-path=%22url(%23b)%22%3E%3Cpath fill=%22%23fdf3ec%22 d=%22M851 703Q735 906 502 903T199 700q-70-200 36-337.5t294.5-189Q718 122 842.5 311t8.5 392Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
//         }}
//       ></div>
//       <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
//         <motion.h2
//           className="text-3xl font-bold mb-8 text-center text-main"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Switchgear Products
//         </motion.h2>

//         {showSearchBar && (
//           <div className="mb-8">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
//             />
//           </div>
//         )}

//         <div className="flex space-x-4 mb-8 overflow-x-auto no-scrollbar">
//           {categories
//             .sort((a, b) => {
//               const order = [
//                 "Distribution Boards",
//                 "Transfer Switching Panel",
//                 "Control Panel",
//               ];
//               return order.indexOf(a.name) - order.indexOf(b.name);
//             })
//             .map((category) => (
//               <Button
//                 key={category.id}
//                 onClick={() => handleTabClick(category.id)}
//                 className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 hover:bg-black hover:text-white ${
//                   selectedTab === category.id
//                     ? "bg-main text-white"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {category.name}
//               </Button>
//             ))}
//         </div>

//         {/* <div>
//           {categories.map(
//             (category) =>
//               selectedTab === category.id && (
//                 <div
//                   key={category.id}
//                   className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//                 >
//                   {(slice ? category.products.slice(0, 3) : category.products)
//                     .filter((product) => filteredProducts.includes(product))
//                     .map((product) => (
//                       <motion.div
//                         key={product._id}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <Card className="h-full bg-white flex flex-col border border-gray-200 hover:shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:border-b-8 hover:border-b-main">
//                           <CardHeader>
//                             <CardTitle className="text-main">
//                               {product.title}
//                             </CardTitle>
//                             <CardDescription className="line-clamp-3">
//                               {product.description}
//                             </CardDescription>
//                           </CardHeader>
//                           <CardContent className="h-48">
//                             <Swiper
//                               navigation={false}
//                               autoplay={
//                                 product.images.length > 1
//                                   ? { delay: 3000, disableOnInteraction: false }
//                                   : false
//                               }
//                               loop={product.images.length > 1}
//                               modules={[Autoplay]}
//                               className="rounded-lg h-full"
//                             >
//                               {product.images.map((image, index) => (
//                                 <SwiperSlide key={index}>
//                                   <div
//                                     className="h-full w-full bg-center bg-cover"
//                                     style={{
//                                       backgroundImage: `url(${image})`,
//                                     }}
//                                   ></div>
//                                 </SwiperSlide>
//                               ))}
//                             </Swiper>
//                           </CardContent>
//                           <CardFooter>
//                             <Button
//                               className="bg-main hover:bg-black text-white"
//                               onClick={() => handleLearnMoreClick(product._id)}
//                             >
//                               Learn More
//                             </Button>
//                           </CardFooter>
//                         </Card>
//                       </motion.div>
//                     ))}
//                 </div>
//               )
//           )}
//         </div> */}

//         {filteredProducts?.length === 0 && searchTerm && (
//           <div className="text-center text-gray-500 py-8">
//             No products found for <q>{searchTerm}</q>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
