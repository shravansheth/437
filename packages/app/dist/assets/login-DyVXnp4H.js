import{i as d,b as l,x as p,r as c,n as m,d as f,a as b}from"./state-Hb2a1ipR.js";var g=Object.defineProperty,i=(h,s,t,o)=>{for(var e=void 0,r=h.length-1,u;r>=0;r--)(u=h[r])&&(e=u(s,t,e)||e);return e&&g(s,t,e),e};const n=class n extends d{constructor(){super(...arguments),this.formData={},this.redirect="/"}render(){return p`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}handleChange(s){const t=s.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,r=this.formData;switch(o){case"username":this.formData={...r,username:e};break;case"password":this.formData={...r,password:e};break}}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=l`
    .error {
      color: red;
    }
  `;let a=n;i([c()],a.prototype,"formData");i([m()],a.prototype,"api");i([m()],a.prototype,"redirect");i([c()],a.prototype,"error");customElements.define("login-form",a);f({"mu-auth":b.Provider,"login-form":a});
