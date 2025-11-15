# Git Hooks with Husky

Este directorio contiene los Git hooks configurados con Husky para mantener la calidad del código.

## 🪝 Hooks Activos

### `pre-commit`
Se ejecuta antes de cada commit.

**Acciones:**
1. ✅ **Linting y Formatting** (lint-staged)
   - ESLint con auto-fix en archivos JS, TS y Vue
   - Prettier para formatear código
   - Solo procesa archivos staged
2. ✅ **Tests completos**
   - Ejecuta toda la suite de tests
   - Bloquea commit si algún test falla
   - Asegura que el commit no rompa nada

---

### `commit-msg`
Valida el formato del mensaje de commit.

**Formato requerido:**
```
<type>(<scope>): <subject>
```

**Ejemplos válidos:**
```bash
git commit -m "feat(hero): add interactive calculator"
git commit -m "fix(api): handle null response from rates endpoint"
git commit -m "docs(readme): update installation steps"
git commit -m "test(navbar): add mobile menu interaction tests"
```

**Tipos permitidos:**
- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Cambios en documentación
- `style` - Cambios de formato (no afectan funcionalidad)
- `refactor` - Refactorización de código
- `test` - Agregar o actualizar tests
- `chore` - Tareas de mantenimiento
- `perf` - Mejoras de performance
- `ci` - Cambios en CI/CD
- `build` - Cambios en build system
- `revert` - Revertir commit anterior

---

### `pre-push`
Se ejecuta antes de hacer push al repositorio remoto.

**Acciones:**
- ✅ Ejecuta todos los tests
- ✅ Bloquea el push si algún test falla

---

## 📝 Best Practices

1. **No uses `--no-verify` a menos que sea absolutamente necesario**
   - Los hooks existen para proteger la calidad del código

2. **Escribe commits pequeños y frecuentes**
   - Los hooks se ejecutan más rápido con menos archivos

3. **Usa mensajes de commit descriptivos**
   - Sigue Conventional Commits para historial limpio

4. **Corre tests localmente antes de push**
   - `npm test` - Evita sorpresas en el hook pre-push

5. **Mantén dependencias actualizadas**
   - `npm update husky lint-staged`

---