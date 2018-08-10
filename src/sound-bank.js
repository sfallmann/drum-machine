import kits from './audio';

const keyConfig = [
  {
    drumPads: [
      { text: 'Q'},
      { text: 'W'},
      { text: 'E'}
    ]
  },
  {
    drumPads: [
      { text: 'A'},
      { text: 'S'},
      { text: 'D'}
    ]
  },
  {
    drumPads: [
      { text: 'Z'},
      { text: 'X'},
      { text: 'C'}
    ]
  }        
]

function mapConfigToKit(kit) {
  return keyConfig.map((rack, rackIndex) => {
    
    rack.drumPads.map((pad, padIndex) => {
      let index = padIndex + (3 * rackIndex);
      pad.sound = kit[index].file;
      pad.name = kit[index].name;
      return pad;
    })
    return rack;
  });
}

const acousticKit = mapConfigToKit(kits.acousticKit);


const soundbank = {
  acousticKit
}

export default soundbank;