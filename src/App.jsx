import React, { useState, useEffect } from "react";
import UserCounter from "./components/UserCounter";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [currentSection, setCurrentSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    pais: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem("usuarios");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedUsers) {
      setUsuarios(JSON.parse(savedUsers));
    }

    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Guardar en localStorage cuando cambien los usuarios
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  // Aplicar tema oscuro/claro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio";
    }

    // Validar correo
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es obligatorio";
    } else if (!formData.correo.includes("@")) {
      newErrors.correo = "El correo debe contener @";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // Validar país
    if (!formData.pais) {
      newErrors.pais = "Debe seleccionar un país";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const nuevoUsuario = {
        nombre: formData.nombre,
        correo: formData.correo,
        pais: formData.pais,
      };

      setUsuarios((prev) => [...prev, nuevoUsuario]);
      setSuccess(true);

      // Reset form
      setFormData({
        nombre: "",
        correo: "",
        password: "",
        pais: "",
      });

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // Cambiar a la sección de usuarios
      setCurrentSection("usuarios");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (section) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">UserSystem</div>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              ☰
            </button>

            <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
              <li>
                <a
                  href="#inicio"
                  className={`nav-link ${
                    currentSection === "inicio" ? "active" : ""
                  }`}
                  onClick={() => navigateTo("inicio")}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#registro"
                  className={`nav-link ${
                    currentSection === "registro" ? "active" : ""
                  }`}
                  onClick={() => navigateTo("registro")}
                >
                  Registro
                </a>
              </li>
              <li>
                <a
                  href="#usuarios"
                  className={`nav-link ${
                    currentSection === "usuarios" ? "active" : ""
                  }`}
                  onClick={() => navigateTo("usuarios")}
                >
                  Usuarios
                </a>
              </li>
              <li>
                <button className="theme-toggle" onClick={toggleTheme}>
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Sección Inicio */}
        {currentSection === "inicio" && (
          <section id="inicio" className="section">
            <div className="container">
              <h1 className="section-title">Sistema de Registro de Usuarios</h1>
              <p className="section-subtitle">
                Una solución moderna y responsive para gestionar usuarios de
                manera eficiente
              </p>

              <div className="home-content">
                <p>
                  Bienvenido a nuestro sistema de registro de usuarios. Esta
                  aplicación te permite registrar nuevos usuarios, validar sus
                  datos en tiempo real y visualizar todos los registros de forma
                  organizada y atractiva.
                </p>

                <div className="features">
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3>Responsive Design</h3>
                    <p>
                      Interfaz adaptable a todos los dispositivos móviles,
                      tablets y escritorio
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Validaciones en Tiempo Real</h3>
                    <p>
                      Validaciones dinámicas sin recargar la página para mejor
                      experiencia de usuario
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Modo Oscuro/Claro</h3>
                    <p>
                      Interfaz personalizable con tema oscuro y claro según tu
                      preferencia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sección Registro */}
        {currentSection === "registro" && (
          <section id="registro" className="section">
            <div className="container">
              <h1 className="section-title">Registro de Usuario</h1>
              <p className="section-subtitle">
                Completa el formulario para registrar un nuevo usuario
              </p>

              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="nombre">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`form-input ${errors.nombre ? "error" : ""}`}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {errors.nombre && (
                      <div className="error-message">{errors.nombre}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="correo">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className={`form-input ${errors.correo ? "error" : ""}`}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.correo && (
                      <div className="error-message">{errors.correo}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? "error" : ""}`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    {errors.password && (
                      <div className="error-message">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pais">
                      País
                    </label>
                    <select
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      className={`form-input ${errors.pais ? "error" : ""}`}
                    >
                      <option value="">Selecciona un país</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Chile">Chile</option>
                      <option value="Colombia">Colombia</option>
                      <option value="México">México</option>
                      <option value="Perú">Perú</option>
                      <option value="España">España</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                    </select>
                    {errors.pais && (
                      <div className="error-message">{errors.pais}</div>
                    )}
                  </div>

                  {success && (
                    <div className="success-message">
                      ✅ Usuario registrado exitosamente!
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary">
                    Registrar Usuario
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Sección Usuarios */}
        {currentSection === "usuarios" && (
          <section id="usuarios" className="section users-section">
            <div className="container">
              <h1 className="section-title">Usuarios Registrados</h1>
              <p className="section-subtitle">
                Lista de todos los usuarios registrados en el sistema
              </p>

              <UserCounter total={usuarios.length} />

              {usuarios.length === 0 ? (
                <div className="empty-state">
                  <h3>No hay usuarios registrados</h3>
                  <p>Registra el primer usuario en la sección de registro</p>
                </div>
              ) : (
                <div className="users-grid">
                  {usuarios.map((usuario, index) => (
                    <UserCard key={index} user={usuario} index={index} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
