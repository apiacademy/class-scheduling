<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!--
  /*********************************************
   * Class Scheduling 
   * Representation Service
   * January 2013
   * Mike Amundsen (@mamund)
   * http://www.infoq.com/author/Mike-Amundsen
   * http://www.linkedin.com/in/mikeamundsen
   ********************************************/
  -->
  <xsl:output
    method="html"
    doctype-system="about:legacy-compat"
    encoding="UTF-8"
    indent="yes" />

  <xsl:template match="/">
    <html>
      <head>
        <title>
          Rocket Science University
        </title>
	      <link type="text/css" rel="stylesheet" href="/file/browser.css" />
      </head>
      <body>
	      <div class="hardbg">
	        <p>
            <img src="/file/Rocket_logo.jpg" align="right" width="165" />
            <h1>Rocket Science University</h1>
	          <h2>Class Scheduling</h2>
          </p>
	        <xsl:apply-templates select="//root/actions" />
	        <p>To view records, select a menu item from above.</p>
        </div>
	      <div class="softbg">
	        <xsl:apply-templates select="//root/error" />
          <xsl:apply-templates select="//root/list" />
        </div>
	      <div class="hardbg">
	        <p class="footer">
            Roc-Sci-You : No better place in the universe!
	        </p>
	      </div>
      </body>
      <script src="/file/browser.js" type="text/javascript">//na</script>
    </html>
  </xsl:template>
  
  <xsl:template match="list">
    <div id="{@name}" class="list-block">
      <h2><xsl:value-of select="@name" /></h2>
      <div clas="item-set">
        <xsl:apply-templates select="item" />
      </div>
      <xsl:apply-templates select="actions" />
    </div> 
  </xsl:template>

  <xsl:template match="item">
  <div class="item">
    <div class="item-display">
      <xsl:apply-templates select="display"/>
    </div>
    <div class="item-actions">
      <xsl:apply-templates select="actions" />
    </div>
  </div>  
  </xsl:template>  

  <xsl:template match="actions">
    <xsl:if test="count(link)>0">
      <ul class="links">
        <xsl:apply-templates select="link" />
      </ul>
    </xsl:if>
    <xsl:apply-templates select="template" />  
  </xsl:template>
      
  <xsl:template match="display">
    <dl>
      <xsl:apply-templates select="data" mode="display"/>
    </dl>
  </xsl:template>
  
  <xsl:template match="link">
    <li>
      <a href="{@href}" title="{@prompt}" class="link" legend="{@action}">
        <xsl:value-of select="@prompt"/>
      </a>
    </li>
  </xsl:template>
  
  <xsl:template match="template">
    <form action="{@href}" method="get" legend="{@action}">
      <fieldset>
        <legend><xsl:value-of select="@action"/></legend>
        <xsl:apply-templates select="data" mode="input"/> 
        <p class="form-actions">
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </fieldset>    
    </form>
  </xsl:template>
 
  <xsl:template match="data" mode="input">
    <p class="input">
      <label><xsl:value-of select="@prompt" /></label>
      <span><input name="{@name}" value="{@value}"/></span>
    </p>
  </xsl:template>

  <xsl:template match="data" mode="display">
    <dt class="{@prompt}"><xsl:value-of select="@prompt" /></dt>
    <dd class="{@prompt}"><xsl:value-of select="@value"/></dd>
  </xsl:template>
  
  <xsl:template match="error">
    <div class="error">
      <h2>Error</h2>
      <xsl:apply-templates match="data" mode="display"/>
    </div>
  </xsl:template>
  
 </xsl:stylesheet>

