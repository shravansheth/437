import{r as d,i as a,x as n,n as h,d as w,_ as v,h as m,a as j}from"./state-Hb2a1ipR.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=e=>(o,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,o)}):customElements.define(e,o)};var _=Object.defineProperty,P=Object.getOwnPropertyDescriptor,l=(e,o,r,c)=>{for(var t=c>1?void 0:c?P(o,r):o,s=e.length-1,i;s>=0;s--)(i=e[s])&&(t=(c?i(o,r,t):i(t))||t);return c&&t&&_(o,r,t),t};let p=class extends a{constructor(){super(...arguments),this.projects=[]}connectedCallback(){super.connectedCallback(),fetch("/api/projects").then(e=>e.json()).then(e=>this.projects=e).catch(e=>console.error("Failed to fetch projects:",e))}render(){return n`
      <section class="intro">
        <h2>Welcome to Woodworking Hub</h2>
        <p>Browse woodworking projects, discover new ideas, and post your own builds to inspire others.</p>
      </section>

      <section class="featured-projects">
        <h2>Featured Projects</h2>
        ${this.projects.map(e=>n`
          <wood-project
            title=${e.title}
            submitter=${e.submitter}
            tools=${e.tools}
            description=${e.description}
            href="/app/project/${e._id}">
          </wood-project>
        `)}
      </section>
    `}};l([d()],p.prototype,"projects",2);p=l([f("home-view")],p);var $=Object.defineProperty,g=(e,o,r,c)=>{for(var t=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(t=i(o,r,t)||t);return t&&$(o,r,t),t};class u extends a{constructor(){super(...arguments),this.slug=""}render(){return n`<p>Project detail for: ${this.slug}</p>`}}g([h()],u.prototype,"slug");const b=[{path:"/app/projects/:slug",view:e=>n`
      <project-view slug=${e.slug}></project-view>
    `},{path:"/app",view:()=>n`<home-view></home-view>`},{path:"/",redirect:"/app"}];w({"mu-auth":j.Provider,"mu-history":m.Provider,"mu-switch":class extends v.Element{constructor(){super(b,"wood:history","wood:auth")}},"home-view":p,"project-view":u});
