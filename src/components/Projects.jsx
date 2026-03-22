import Icon from "./Icon";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="uppercase tracking-[0.2em] text-secondary font-bold text-[10px] block mb-4">02. Selected Works</span>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter">Handcrafted Software.</h2>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-primary font-headline font-bold text-sm border-b-2 border-primary-container pb-1 hover:border-primary transition-all">
            Browse GitHub <Icon name="arrow_right_alt" className="text-sm group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:border-primary/20 transition-all duration-500">
            <div className="p-8 md:p-12 h-full flex flex-col">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center"><Icon name="brush" className="text-2xl text-primary" /></div>
                  <h3 className="text-2xl md:text-3xl font-headline font-extrabold">Modern_UI_Kit</h3>
                </div>
                <p className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">A collection of high-performance Android components designed for speed and consistency across diverse device ecosystems.</p>
              </div>
              <div className="mt-auto aspect-video md:aspect-[21/9] bg-surface-container rounded-2xl overflow-hidden relative border border-black/5">
                <img alt="Modern UI components" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYVMAkrtpSIuSDZPcvQphPf5KGnVexchmvQt8Zw-xmfc-7BnWovoqs0byNTXx9oaM2kNRtCVbtBUpmH-rPIcwPs3KAC0vP9C9pAeQkopB3MN0ZQlXeDhfEsyTh6j5tyqUE8jt4y9TzADv2LGriuBqdnc62-PEW5shSI_v_R55B9KWhJpvcQFWZHaPUK7nE7FfzjZlnojoKRxeDDqpSO_SLqZHpQ9fWeuxk_bdKxpDRVPvCHogfgWi8V7IARR5sMQ8QoSamXsNky8"/>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          <div id="tech-stack" className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 md:p-12 flex flex-col justify-between editorial-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div>
              <span className="uppercase tracking-[0.2em] opacity-60 font-bold text-[10px] block mb-8">Capabilities</span>
              <h3 className="text-3xl md:text-4xl font-headline font-extrabold mb-10">The Stack.</h3>
              <ul className="space-y-4 md:space-y-6 font-headline font-bold text-xl md:text-2xl">
                {["Java SE/EE", "Android SDK", "ReactiveX", "Kotlin MP", "Dagger/Hilt", "Jetpack Compose"].map((item) => (
                  <li key={item} className="flex items-center gap-4 group/item"><span className="w-1.5 h-1.5 bg-primary-container rounded-full group-hover/item:scale-150 transition-transform" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="pt-10"><p className="text-primary-container/80 text-xs leading-relaxed uppercase tracking-widest font-bold">Continuous evolution.</p></div>
          </div>
          <div className="md:col-span-6 bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center"><Icon name="lan" className="text-2xl text-primary" /></div>
                <span className="bg-surface-container-highest/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">v2.4.0</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-4">Reactive_Server</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">A highly scalable Java backbone designed to handle millions of concurrent connections with minimal latency.</p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-black/5">
                <img alt="Reactive Server" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_gcJydABHqO1iQFJTs1sAgNVL_PES0rsOd2D4N3NHzNtncrELNjigeoL2P1gobpxEpG6rIWAkkexa2NeV6gZyrMkGilDtp7Yjcg0__826_2bA9VTDXe6-BVI_MV_XN2rCTLLRQAofuFBeQuP2UbcbFlWWHgB7GQl2Xpe_6MtK2e9tlxmw1pTTFVM6q6maCNPkrBdvm7SVNpvvPtvNAD4gml0yjmKvtsCZrrKjRpYPUEqt4HH-V3AZk7cqssCnMOYVJEHl9GWsqc"/>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 bg-surface-container rounded-3xl overflow-hidden editorial-shadow group border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center"><Icon name="monitoring" className="text-2xl text-primary" /></div>
                <span className="bg-surface-container-highest/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5">Stable</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-4">Core_Analytics</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">Lightweight, privacy-first data processing engine for Android applications to monitor engagement in real-time.</p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white border border-black/5">
                <img alt="Core Analytics" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2SnlXIcKvc9ppuwG3V17qhTHaZLWN0J6TBGd_hP9HwgnEMp-FKFKuIG_iyMo7UI_ZDKUCR-euUHNunzzqy-rT-A2AiXaWpCdTQJ39z7hAdM0gc5j-QX3zL4SmMwuczj8VkZUPLwJx5JpFxBuw-oOF611JLCLgG0fPAYpRa-iqoEFQTCw15FBkYxJQdq7GoAhndBqvtkgswu_xmcOgDc2d8Qv3efaSKWyLTx_u353FtVUkNDtjCU2RhfFjAXUb3lJBtqwGlLa_1C0"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
