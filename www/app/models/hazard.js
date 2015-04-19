DisplayObject = require('./display_object');

Hazard = DisplayObject.extend({
  props:{
    protector:'object',
    protectorPrimes:'array',
    hazard:{
      type:'boolean',
      default:true
    }
  },
  protected:function(){
    if(!this.protector || !this.protectorPrimes || this.protectorPrimes.length === 0){return false}
    return this.protectorPrimes.some(function(prime){
      return prime === this.protector.groupSize
    },this)
  }

})

module.exports = Hazard