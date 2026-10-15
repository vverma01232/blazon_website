// import { Star } from "lucide-react";
// import { testimonials } from "@/data/testimonials";

// export default function TestimonialsSection() {
//   return (
//     <section id="testimonials" className="py-20 px-6 md:px-12 bg-[#0a0e18]">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
//             <Star className="w-4 h-4 text-orange-500" />
//             <span className="text-sm font-medium text-orange-500">
//               {/* Trusted by Healthcare Providers */}
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             {/* Success Stories &{" "} */}
//             <span className="text-orange-500">Testimonials</span>
//           </h2>

//           <p className="text-lg text-white/60 max-w-2xl mx-auto">
            
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/10"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/20"
//                 />

//                 <div className="flex-1">
//                   <h3 className="text-white font-semibold">
//                     {testimonial.name}
//                   </h3>
//                   <p className="text-sm text-white/60">
//                     {testimonial.role}
//                   </p>

//                   <div className="flex gap-1 mt-2">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-3.5 h-3.5 fill-orange-500 text-orange-500"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <p className="text-white/80 text-sm mb-4 leading-relaxed">
//                 "{testimonial.testimonial}"
//               </p>

//               <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-medium text-orange-400">
//                 {testimonial.product}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }