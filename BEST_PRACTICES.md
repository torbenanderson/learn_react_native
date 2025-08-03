# React Native Best Practices 🚀

That's a fantastic question. Adopting good practices early on can save you a lot of time and headaches down the road. Here are some of the most important good practices for React Native, categorized for clarity.

## 1. Performance and Optimization

Performance is crucial for a smooth mobile experience.

### **Optimize Lists**
For any list with more than a few items, always use **`FlatList`** (or **`FlashList`** from Shopify, which is even faster) instead of a `ScrollView`. List components are designed to efficiently render only the items visible on the screen.

```typescript
// ✅ Good - Using FlatList for performance
import { FlatList } from 'react-native';

const MyList = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <ListItem item={item} />}
    keyExtractor={(item) => item.id}
  />
);

// ❌ Bad - Using ScrollView for large lists
import { ScrollView } from 'react-native';

const MyList = ({ data }) => (
  <ScrollView>
    {data.map(item => <ListItem key={item.id} item={item} />)}
  </ScrollView>
);
```

### **Use Memoization**
Use `React.memo` for components, `useCallback` for functions, and `useMemo` for values to prevent unnecessary re-renders. This is particularly important for large or complex components.

```typescript
// ✅ Good - Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);

  const handlePress = useCallback(() => {
    // Handle press
  }, []);

  return <TouchableOpacity onPress={handlePress}>{processedData}</TouchableOpacity>;
});
```

### **Asset Management**
Optimize image sizes and formats. Compress large images and use a tool like **`expo-image`** which handles caching and loading placeholders for you.

```typescript
// ✅ Good - Using expo-image for optimization
import { Image } from 'expo-image';

const OptimizedImage = () => (
  <Image
    source={require('./large-image.jpg')}
    style={{ width: 200, height: 200 }}
    placeholder="blur"
    contentFit="cover"
  />
);
```

### **Avoid Excessive `console.log()`**
In development, `console.log` is useful, but too many can slow down your app significantly, especially on a real device.

```typescript
// ✅ Good - Conditional logging
const debugLog = (message: string) => {
  if (__DEV__) {
    console.log(message);
  }
};

// ❌ Bad - Unconditional logging in production
console.log('This will slow down production');
```

## 2. Code Reusability and Component Design

This is about writing clean, maintainable, and scalable code.

### **Atomic Components**
Break down your UI into small, single-purpose components. For example, a `Button` component should just be a button, not a button with an attached API call. This makes your UI more modular and easier to test.

```typescript
// ✅ Good - Single responsibility component
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity 
    style={[styles.button, styles[variant]]} 
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ❌ Bad - Component with mixed responsibilities
const ButtonWithAPI = ({ title, userId }) => (
  <TouchableOpacity onPress={() => api.updateUser(userId)}>
    <Text>{title}</Text>
  </TouchableOpacity>
);
```

### **Custom Hooks**
Abstract complex logic (like data fetching, form handling, or animations) into custom hooks. This keeps your components clean and makes the logic reusable across your app.

```typescript
// ✅ Good - Custom hook for data fetching
const useUserData = (userId: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await api.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

// Usage in component
const UserProfile = ({ userId }) => {
  const { user, loading, error } = useUserData(userId);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserCard user={user} />;
};
```

### **TypeScript Best Practices**
Since you're using TypeScript, lean into it. **Type your component props and state** explicitly. This prevents common bugs and provides a much better developer experience with autocompletion.

```typescript
// ✅ Good - Proper TypeScript usage
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onPress?: (user: User) => void;
  variant?: 'compact' | 'detailed';
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onPress, 
  variant = 'detailed' 
}) => {
  const handlePress = () => {
    onPress?.(user);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{user.name}</Text>
      {variant === 'detailed' && <Text>{user.email}</Text>}
    </TouchableOpacity>
  );
};
```

### **Consistent Styling**
Centralize your styling strategy. Whether you use a styling library or a design system, stick to it consistently to ensure a uniform UI.

```typescript
// ✅ Good - Centralized styling
// constants/Colors.ts
export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  error: '#FF3B30',
  background: '#FFFFFF',
  text: '#000000',
};

// constants/Spacing.ts
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Usage in components
const MyComponent = () => (
  <View style={{ 
    padding: Spacing.md, 
    backgroundColor: Colors.background 
  }}>
    <Text style={{ color: Colors.text }}>Hello World</Text>
  </View>
);
```

## 3. Navigation and Routing

Since you're using Expo Router, keep these tips in mind.

### **Context for Navigation**
If you need to access navigation logic in a component that isn't a screen, use the navigation context or hooks provided by Expo Router rather than passing navigation props down multiple levels.

```typescript
// ✅ Good - Using router hooks
import { useRouter } from 'expo-router';

const DeepComponent = () => {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push('/profile');
  };
  
  return <Button onPress={handleNavigation} title="Go to Profile" />;
};

// ❌ Bad - Passing navigation props down
const DeepComponent = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate('Profile');
  };
  
  return <Button onPress={handleNavigation} title="Go to Profile" />;
};
```

### **Lazy Loading**
For larger apps, consider using **lazy loading** to load screen components only when they are needed. This can improve the initial startup time of your application.

```typescript
// ✅ Good - Lazy loading with dynamic imports
import { lazy, Suspense } from 'react';

const ProfileScreen = lazy(() => import('./ProfileScreen'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <ProfileScreen />
  </Suspense>
);
```

## 4. Dependency Management and Maintenance

Keep your project healthy and secure.

### **Regular Updates**
Regularly update your dependencies to get the latest features and security patches. For Expo, the best way to do this is to run `npx expo upgrade`.

```bash
# ✅ Good - Regular dependency updates
npx expo upgrade

# Check for outdated packages
npm outdated

# Update specific packages
npm update @react-navigation/native
```

### **Use `npx expo doctor`**
Run this command regularly. It checks your project for common configuration issues and dependency mismatches, which can save you a lot of time debugging.

```bash
# ✅ Good - Regular health checks
npx expo doctor

# This will check for:
# - Dependency conflicts
# - Configuration issues
# - Missing peer dependencies
# - Outdated packages
```

### **Keep `package.json` Clean**
Remove any dependencies you are no longer using. This keeps your project lightweight and prevents unnecessary installs.

```bash
# ✅ Good - Clean up unused dependencies
npm prune

# Check for unused dependencies
npx depcheck

# Remove specific unused packages
npm uninstall unused-package
```

## 5. Testing and Quality Assurance

### **Component Testing**
Test your components to ensure they work correctly and don't break with changes.

```typescript
// ✅ Good - Component testing
import { render, fireEvent } from '@testing-library/react-native';

test('Button calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button title="Test" onPress={onPress} />);
  
  fireEvent.press(getByText('Test'));
  expect(onPress).toHaveBeenCalled();
});
```

### **Error Boundaries**
Implement error boundaries to catch and handle errors gracefully.

```typescript
// ✅ Good - Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 6. Security Best Practices

### **Secure Storage**
Always use secure storage for sensitive data like tokens and passwords.

```typescript
// ✅ Good - Secure storage
import * as SecureStore from 'expo-secure-store';

const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('userToken', token);
};

const getToken = async () => {
  return await SecureStore.getItemAsync('userToken');
};
```

### **Input Validation**
Always validate user input to prevent security vulnerabilities.

```typescript
// ✅ Good - Input validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValid(validateEmail(text));
  };

  return (
    <TextInput
      value={email}
      onChangeText={handleEmailChange}
      style={[styles.input, !isValid && styles.inputError]}
    />
  );
};
```

## 7. Accessibility

### **Accessibility Labels**
Always provide accessibility labels for screen readers.

```typescript
// ✅ Good - Accessibility support
const AccessibleButton = () => (
  <TouchableOpacity
    accessible={true}
    accessibilityLabel="Submit form button"
    accessibilityHint="Double tap to submit the form"
    onPress={handleSubmit}
  >
    <Text>Submit</Text>
  </TouchableOpacity>
);
```

### **Color Contrast**
Ensure sufficient color contrast for users with visual impairments.

```typescript
// ✅ Good - High contrast colors
const Colors = {
  primary: '#007AFF', // High contrast blue
  text: '#000000',    // Pure black for maximum contrast
  background: '#FFFFFF', // Pure white background
};
```

## Summary

Following these best practices will help you build:
- **High-performance** React Native applications
- **Maintainable** and **scalable** code
- **Secure** and **accessible** user experiences
- **Well-tested** and **reliable** components

Remember, good practices are not just about writing code—they're about creating a foundation that will support your app as it grows and evolves. 

## 8. Platform-Specific Considerations

React Native runs on multiple platforms, so consider platform differences.

### **Platform-Specific Code**
Use `Platform.select()` for platform-specific implementations.

```typescript
// ✅ Good - Platform-specific styling
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      ios: 20,
      android: 16,
      default: 16,
    }),
    shadowColor: Platform.select({
      ios: '#000',
      android: 'transparent',
      default: '#000',
    }),
    shadowOffset: Platform.select({
      ios: { width: 0, height: 2 },
      android: { width: 0, height: 0 },
      default: { width: 0, height: 2 },
    }),
    elevation: Platform.select({
      android: 4,
      default: 0,
    }),
  },
});
```

### **Platform-Specific Components**
Create platform-specific component files when needed.

```typescript
// ✅ Good - Platform-specific components
// components/Button.ios.tsx
export const Button = ({ title, onPress }) => (
  <TouchableOpacity style={iosButtonStyle} onPress={onPress}>
    <Text style={iosTextStyle}>{title}</Text>
  </TouchableOpacity>
);

// components/Button.android.tsx
export const Button = ({ title, onPress }) => (
  <TouchableOpacity style={androidButtonStyle} onPress={onPress}>
    <Text style={androidTextStyle}>{title}</Text>
  </TouchableOpacity>
);
```

### **Safe Area Handling**
Always handle safe areas properly for different devices.

```typescript
// ✅ Good - Safe area handling
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Screen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {/* Your content */}
    </View>
  );
};
```

## 9. State Management Best Practices

### **Choose the Right State Management**
Select state management based on your app's complexity.

```typescript
// ✅ Good - Local state for simple cases
const SimpleComponent = () => {
  const [count, setCount] = useState(0);
  return <Button onPress={() => setCount(count + 1)} title={`Count: ${count}`} />;
};

// ✅ Good - Context for shared state
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Good - Zustand for complex state
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### **Avoid Prop Drilling**
Use Context or state management libraries to avoid passing props through multiple levels.

```typescript
// ❌ Bad - Prop drilling
const App = () => (
  <UserProvider>
    <Header user={user} />
    <MainContent user={user} />
    <Footer user={user} />
  </UserProvider>
);

// ✅ Good - Using Context
const App = () => (
  <UserProvider>
    <Header />
    <MainContent />
    <Footer />
  </UserProvider>
);
```

## 10. Debugging and Development Tools

### **React Native Debugger**
Use React Native Debugger for better debugging experience.

```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Start with your app
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### **Flipper Integration**
Use Flipper for advanced debugging and plugin ecosystem.

```typescript
// ✅ Good - Flipper configuration
// ios/Podfile
pod 'Flipper', '~> 0.182.0'
pod 'Flipper-RSocket', '~> 1.4'

// android/app/build.gradle
debugImplementation("com.facebook.flipper:flipper:0.182.0")
debugImplementation("com.facebook.flipper:flipper-network-plugin:0.182.0")
```

### **Performance Monitoring**
Monitor your app's performance in production.

```typescript
// ✅ Good - Performance monitoring
import { PerformanceObserver } from 'react-native-performance';

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure'] });
```

## 11. Error Handling and Logging

### **Global Error Handling**
Implement global error handling for better user experience.

```typescript
// ✅ Good - Global error boundary
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Something went wrong</Text>
    <Text style={styles.errorMessage}>{error.message}</Text>
    <Button onPress={resetErrorBoundary} title="Try again" />
  </View>
);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <YourApp />
  </ErrorBoundary>
);
```

### **Structured Logging**
Use structured logging for better debugging.

```typescript
// ✅ Good - Structured logging
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};

// Usage
logger.info('User logged in', { userId: '123', timestamp: Date.now() });
logger.error('API call failed', new Error('Network error'));
```

## 12. Network and API Best Practices

### **API Client Setup**
Create a centralized API client with proper error handling.

```typescript
// ✅ Good - API client with interceptors
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.yourapp.com',
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      logout();
    }
    return Promise.reject(error);
  }
);
```

### **Offline Support**
Implement offline support for better user experience.

```typescript
// ✅ Good - Offline detection
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  }, []);

  return isConnected;
};

// Usage
const MyComponent = () => {
  const isConnected = useNetworkStatus();
  
  if (!isConnected) {
    return <OfflineBanner />;
  }
  
  return <YourContent />;
};
```

## 13. Memory Management

### **Image Optimization**
Optimize images to prevent memory issues.

```typescript
// ✅ Good - Image optimization
import { Image } from 'expo-image';

const OptimizedImage = ({ uri, width, height }) => (
  <Image
    source={{ uri }}
    style={{ width, height }}
    contentFit="cover"
    cachePolicy="memory-disk"
    placeholder="blur"
    transition={200}
  />
);
```

### **List Optimization**
Optimize lists for large datasets.

```typescript
// ✅ Good - Optimized FlatList
const OptimizedList = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <ListItem item={item} />}
    keyExtractor={(item) => item.id}
    getItemLayout={(data, index) => ({
      length: 80,
      offset: 80 * index,
      index,
    })}
    removeClippedSubviews={true}
    maxToRenderPerBatch={10}
    windowSize={10}
    initialNumToRender={10}
  />
);
```

### **Component Cleanup**
Always cleanup resources in useEffect.

```typescript
// ✅ Good - Proper cleanup
const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const getLocation = async () => {
      try {
        const result = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(result);
        }
      } catch (error) {
        console.error('Location error:', error);
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return location;
};
```

## 14. Security Best Practices

### **Certificate Pinning**
Implement certificate pinning for enhanced security.

```typescript
// ✅ Good - Certificate pinning
import { fetch } from 'react-native-ssl-pinning';

const secureApiCall = async (url: string, options: any) => {
  try {
    const response = await fetch(url, {
      ...options,
      sslPinning: {
        certs: ['cert1', 'cert2'], // Your certificates
      },
    });
    return response;
  } catch (error) {
    console.error('SSL pinning error:', error);
    throw error;
  }
};
```

### **Biometric Authentication**
Implement biometric authentication for sensitive operations.

```typescript
// ✅ Good - Biometric authentication
import * as LocalAuthentication from 'expo-local-authentication';

const useBiometricAuth = () => {
  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
      });
      
      return result.success;
    }
    
    return false;
  };

  return { authenticate };
};
```

## 15. Testing Best Practices

### **Component Testing**
Test your components thoroughly.

```typescript
// ✅ Good - Comprehensive component testing
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Test" onPress={() => {}} />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test" onPress={onPress} />);
    
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { getByTestId } = render(<Button title="Test" loading={true} />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });
});
```

### **Integration Testing**
Test complete user flows.

```typescript
// ✅ Good - Integration testing
describe('Login Flow', () => {
  it('completes login successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(getByText('Welcome')).toBeTruthy();
    });
  });
});
```

## 16. Performance Monitoring

### **Bundle Size Optimization**
Monitor and optimize your bundle size.

```bash
# Analyze bundle size
npx react-native-bundle-visualizer

# Check for unused dependencies
npx depcheck

# Tree shake unused code
npx react-native-bundle-analyzer
```

### **Performance Profiling**
Use React DevTools for performance profiling.

```typescript
// ✅ Good - Performance monitoring
import { PerformanceObserver } from 'react-native-performance';

const usePerformanceMonitoring = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 100) {
          console.warn(`Slow operation: ${entry.name} took ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);
};
```

## Summary

Following these comprehensive best practices will help you build:
- **High-performance** React Native applications
- **Maintainable** and **scalable** code
- **Secure** and **accessible** user experiences
- **Well-tested** and **reliable** components
- **Platform-optimized** applications
- **Memory-efficient** and **network-resilient** apps

Remember, good practices are not just about writing code—they're about creating a foundation that will support your app as it grows and evolves. 