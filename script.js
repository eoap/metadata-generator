function parseAuthors(str) {
  // Parses "Name <email>" entries
  return str.split(",").map(entry => {
    const match = entry.trim().match(/(.*?)\s*<(.+?)>/);
    const name = match ? match[1].trim() : entry.trim();
    const email = match ? match[2].trim() : "";
    return {
      "@type": "s:Person",
      "s:name": name,
      ...(email && { "s:email": email }),
      "s:affiliation": {
        "@type": "s:Organization",
        "s:name": "Terradue"
      }
    };
  });
}

function generateYAML() {
  const metadata = {
    "$namespaces": { s: "https://schema.org/" },
    "schemas": ["http://schema.org/version/9.0/schemaorg-current-http.rdf"],
    "s:name": document.getElementById("name").value,
    "s:softwareVersion": document.getElementById("version").value,
    "s:abstract": document.getElementById("abstract").value,
    "s:applicationCategory": document.getElementById("category").value,
    "s:applicationSubCategory": document.getElementById("subcategory").value,
    "s:author": parseAuthors(document.getElementById("authors").value),
    "s:codeRepository": document.getElementById("repo").value,
    "s:license": {
      "@type": "s:CreativeWork",
      "s:name": "License CC BY 4.0",
      "s:url": document.getElementById("license").value
    },
    "s:softwareHelp": {
      "@type": "s:CreativeWork",
      "s:encodingFormat": "text/html",
      "s:name": "User Manual",
      "s:url": document.getElementById("help").value
    },
    "s:publisher": {
      "@type": "s:Organization",
      "s:name": "Terradue Srl",
      "s:email": "info@terradue.com"
    },
    "s:copyrightYear": new Date().getFullYear(),
    "s:dateCreated": new Date().toISOString().slice(0, 10)
  };

  const yaml = jsyaml.dump(metadata, { noRefs: true });
  document.getElementById("output").value = yaml;
  return yaml;
}

function downloadYAML() {
  const yaml = generateYAML();
  const blob = new Blob([yaml], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "metadata.yaml";
  a.click();
  URL.revokeObjectURL(url);
}
