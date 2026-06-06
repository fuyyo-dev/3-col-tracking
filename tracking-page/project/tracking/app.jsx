// ── Mounts the three structurally-distinct directions on the design canvas.
const ART_W = 1280, ART_H = 1660;

function App() {
  return (
    <DesignCanvas>
      <DCSection id="directions" title="Tracking page — 3 distinct directions"
        subtitle="Same 3-column layout & Flow-3 data · 3 genuinely different design languages · parallax throughout · toggle In Transit / Delivered in each header · drag to reorder · click ⤢ to focus">
        <DCArtboard id="refined" label="1 · Refined (Aurora)" width={ART_W} height={ART_H} style={{ background: 'hsl(38 26% 96%)' }}>
          <TrackingPage variant="premium" minH={ART_H} />
        </DCArtboard>
        <DCArtboard id="brutal" label="2 · Neo-Brutalism" width={ART_W} height={ART_H} style={{ background: '#FBF6EA' }}>
          <BrutalPage minH={ART_H} />
        </DCArtboard>
        <DCArtboard id="flat" label="3 · Flat / No Containers" width={ART_W} height={ART_H} style={{ background: '#fffdfa' }}>
          <FlatPage minH={ART_H} />
        </DCArtboard>
        <DCArtboard id="centerstage" label="4 · Center Stage" width={1360} height={ART_H} style={{ background: '#fffdfa' }}>
          <CenterStagePage minH={ART_H} />
        </DCArtboard>
        <DCArtboard id="spine" label="5 · The Spine" width={1320} height={1380} style={{ background: '#fffdfa' }}>
          <SpinePage minH={1340} />
        </DCArtboard>
        <DCArtboard id="modular" label="6 · Modular (Two-Tier)" width={1320} height={1480} style={{ background: '#fffdfa' }}>
          <ModularPage minH={1440} />
        </DCArtboard>
        <DCArtboard id="singletier" label="7 · Single-Tier 3-Col" width={1320} height={1560} style={{ background: '#fffdfa' }}>
          <SingleTierPage minH={1520} />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
